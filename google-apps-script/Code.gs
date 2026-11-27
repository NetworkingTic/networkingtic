/**
 * @OnlyCurrentDoc  ← limita los permisos del script a ESTA hoja (no a todo su Google Drive)
 */

/**
 * ============================================================================
 *  NETWORKING TIC — Receptor del formulario de contacto
 *  Formulario web → Google Apps Script → Google Sheets → Notificación a Gmail
 * ============================================================================
 *
 *  Va pegado en: Hoja "REGISTRO_CONTACTOS_PLATAFORMA" → Extensiones → Apps Script
 *  Propietario: la cuenta de Google que crea la hoja (no hay datos de terceros).
 *
 *  Qué hace con cada mensaje:
 *   1. Lee los datos enviados por la página (JSON en texto plano, sin credenciales).
 *   2. Descarta en silencio a los robots (campo trampa invisible y envíos demasiado rápidos).
 *   3. Valida campos obligatorios, longitudes, formato del correo y del teléfono.
 *   4. Evita duplicados (mismo envío repetido o mismo mensaje en 10 minutos).
 *   5. Limita la frecuencia (por correo y en total por minuto).
 *   6. Neutraliza la inyección de fórmulas en la hoja (=, +, -, @ al inicio).
 *   7. Genera un ID único y la fecha en hora de Bogotá, y guarda una fila nueva.
 *   8. Avisa por Gmail al propietario. Si el correo falla, el mensaje YA quedó guardado.
 *   9. Responde a la página con el resultado real ({ ok: true, id } o el motivo del error).
 *
 *  Funciones para ejecutar a mano desde el editor:
 *   - configurar()        → crea/ordena la pestaña "Mensajes", encabezados y formato. Ejecutar 1 vez.
 *   - probarRegistro()    → simula un envío y guarda una fila de prueba (Origen = PRUEBA INTERNA).
 * ============================================================================
 */

const CONFIG = {
  SHEET_NAME: 'Mensajes',
  HEADERS: ['ID', 'Fecha', 'Nombre', 'Correo', 'Teléfono', 'Asunto', 'Mensaje', 'Estado', 'Origen', 'Empresa', 'Ciudad'],
  ESTADOS: ['NUEVO', 'EN PROCESO', 'RESPONDIDO', 'CERRADO'],
  TIMEZONE: 'America/Bogota',

  // Longitud máxima de cada campo (caracteres)
  MAX: { nombre: 100, correo: 254, telefono: 20, empresa: 150, ciudad: 80, mensaje: 3000, origen: 200 },

  // Antispam y límites
  MIN_FILL_MS: 3000,            // un humano tarda más de 3 s en llenar el formulario
  MAX_POR_CORREO: 3,            // máximo 3 mensajes por correo...
  VENTANA_CORREO_SEG: 600,      // ...cada 10 minutos
  MAX_GLOBAL_POR_MINUTO: 20,    // máximo 20 mensajes en total por minuto
  VENTANA_DUPLICADO_SEG: 600,   // un mensaje idéntico en 10 minutos se considera duplicado
};

/* ---------------------------------------------------------------------------
 *  Punto de entrada: la página envía aquí cada mensaje (POST)
 * ------------------------------------------------------------------------- */
function doPost(e) {
  try {
    const data = leerCuerpo_(e);
    if (!data) return responder_({ ok: false, code: 'BAD_REQUEST' });

    // 1) Antispam silencioso: a los robots se les responde "ok" pero no se guarda nada
    if (String(data.website || '').trim() !== '') return responder_({ ok: true, id: null });
    const elapsed = Number(data.elapsedMs);
    if (!isFinite(elapsed) || elapsed < CONFIG.MIN_FILL_MS) return responder_({ ok: true, id: null });

    // 2) Validación
    const campos = limpiar_(data);
    const errores = validar_(campos);
    if (Object.keys(errores).length) return responder_({ ok: false, code: 'VALIDATION', fields: errores });

    // 3) Sección crítica: un envío a la vez (evita filas duplicadas por envíos simultáneos)
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(15000)) return responder_({ ok: false, code: 'BUSY' });

    let id;
    try {
      const cache = CacheService.getScriptCache();
      const submissionId = String(data.submissionId || '').slice(0, 64);
      const huella = huella_(campos.correo + '|' + campos.mensaje);

      // 3a) Duplicados: el mismo envío repetido, o el mismo mensaje en la ventana de tiempo
      const previo = (submissionId && cache.get('sub_' + submissionId)) || cache.get('dup_' + huella);
      if (previo) return responder_({ ok: true, id: previo, duplicate: true });

      // 3b) Límite de frecuencia
      const kCorreo = 'rate_' + huella_(campos.correo);
      const usosCorreo = Number(cache.get(kCorreo) || 0);
      if (usosCorreo >= CONFIG.MAX_POR_CORREO) return responder_({ ok: false, code: 'RATE_LIMIT' });
      const kGlobal = 'global_' + Utilities.formatDate(new Date(), 'UTC', 'yyyyMMddHHmm');
      const usosGlobal = Number(cache.get(kGlobal) || 0);
      if (usosGlobal >= CONFIG.MAX_GLOBAL_POR_MINUTO) return responder_({ ok: false, code: 'RATE_LIMIT' });

      // 3c) Registro en la hoja
      id = generarId_();
      const ahora = new Date();
      const fecha = Utilities.formatDate(ahora, CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
      const asunto = 'Contacto web' + (campos.empresa ? ' - ' + campos.empresa : '');
      const origen = ('Formulario web' + (campos.origen ? ' | ' + campos.origen : '')).slice(0, CONFIG.MAX.origen);

      const fila = [id, fecha, campos.nombre, campos.correo, campos.telefono, asunto, campos.mensaje, 'NUEVO', origen, campos.empresa, campos.ciudad]
        .map(seguroParaHoja_);
      hoja_().appendRow(fila);
      SpreadsheetApp.flush();

      // 3d) Recordar el envío para detectar duplicados y contar la frecuencia
      if (submissionId) cache.put('sub_' + submissionId, id, CONFIG.VENTANA_DUPLICADO_SEG);
      cache.put('dup_' + huella, id, CONFIG.VENTANA_DUPLICADO_SEG);
      cache.put(kCorreo, String(usosCorreo + 1), CONFIG.VENTANA_CORREO_SEG);
      cache.put(kGlobal, String(usosGlobal + 1), 120);
    } finally {
      lock.releaseLock();
    }

    // 4) Aviso por Gmail. Si falla, el mensaje ya está guardado: solo se registra el error.
    try {
      notificar_(id);
    } catch (err) {
      console.error('No se pudo enviar la notificación del mensaje ' + id + ': ' + err);
    }

    return responder_({ ok: true, id: id });
  } catch (err) {
    console.error('Error inesperado en doPost: ' + (err && err.stack ? err.stack : err));
    return responder_({ ok: false, code: 'SERVER_ERROR' });
  }
}

/* Comprobación rápida desde el navegador: abrir la URL /exec debe mostrar status "online" */
function doGet() {
  return responder_({ ok: true, service: 'networkingtic-contacto', status: 'online' });
}

/* ---------------------------------------------------------------------------
 *  Configuración inicial (ejecutar 1 vez desde el editor)
 * ------------------------------------------------------------------------- */
function configurar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sh) {
    const primera = ss.getSheets()[0];
    sh = primera.getLastRow() === 0 ? primera.setName(CONFIG.SHEET_NAME) : ss.insertSheet(CONFIG.SHEET_NAME, 0);
  }

  const cols = CONFIG.HEADERS.length;
  sh.getRange(1, 1, 1, cols).setValues([CONFIG.HEADERS])
    .setFontWeight('bold').setFontColor('#ffffff').setBackground('#1271b2')
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  sh.setFrozenRows(1);
  sh.setRowHeight(1, 32);

  const anchos = [190, 150, 180, 220, 130, 220, 420, 120, 260, 180, 120];
  anchos.forEach(function (w, i) { sh.setColumnWidth(i + 1, w); });
  sh.getRange('G:G').setWrap(true);
  sh.getRange('A:K').setVerticalAlignment('top');
  sh.getRange('B:B').setNumberFormat('@'); // la fecha se guarda como texto legible

  // Lista desplegable para la columna Estado
  const regla = SpreadsheetApp.newDataValidation().requireValueInList(CONFIG.ESTADOS, true).setAllowInvalid(false).build();
  sh.getRange(2, 8, sh.getMaxRows() - 1, 1).setDataValidation(regla);

  // Colores según el estado
  const rango = sh.getRange(2, 1, sh.getMaxRows() - 1, cols);
  const color = function (estado, fondo) {
    return SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$H2="' + estado + '"').setBackground(fondo).setRanges([rango]).build();
  };
  sh.setConditionalFormatRules([color('NUEVO', '#e3f2fd'), color('EN PROCESO', '#fff8e1'), color('RESPONDIDO', '#e8f5e9'), color('CERRADO', '#eeeeee')]);

  // Hace que Google pida los permisos necesarios (hoja y Gmail) en este momento
  MailApp.getRemainingDailyQuota();

  SpreadsheetApp.getUi().alert('Listo: la pestaña "Mensajes" quedó configurada.');
}

/* Prueba interna desde el editor: guarda una fila de prueba y envía el aviso */
function probarRegistro() {
  const res = doPost({
    postData: {
      contents: JSON.stringify({
        Nombre: 'Prueba interna', Email: Session.getEffectiveUser().getEmail(), NombreEmpresa: 'NETWORKING TIC',
        Telefono: '3000000000', Ciudad: 'Bogotá', Mensaje: 'Mensaje de prueba generado desde el editor de Apps Script.',
        origen: 'PRUEBA INTERNA', website: '', elapsedMs: 10000, submissionId: Utilities.getUuid(),
      }),
    },
  });
  console.log(res.getContent());
}

/* ---------------------------------------------------------------------------
 *  Funciones internas
 * ------------------------------------------------------------------------- */
function leerCuerpo_(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return null;
    const obj = JSON.parse(e.postData.contents);
    return obj && typeof obj === 'object' ? obj : null;
  } catch (err) {
    return null;
  }
}

// Acepta los nombres de campo que ya usa la página (Nombre, Email, NombreEmpresa, Telefono, Ciudad, Mensaje)
function limpiar_(d) {
  const txt = function (v, max) {
    return String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);
  };
  return {
    nombre: txt(d.Nombre, CONFIG.MAX.nombre),
    correo: txt(d.Email, CONFIG.MAX.correo).toLowerCase(),
    telefono: txt(d.Telefono, CONFIG.MAX.telefono),
    empresa: txt(d.NombreEmpresa, CONFIG.MAX.empresa),
    ciudad: txt(d.Ciudad, CONFIG.MAX.ciudad),
    mensaje: txt(d.Mensaje, CONFIG.MAX.mensaje),
    origen: txt(d.origen, CONFIG.MAX.origen),
  };
}

function validar_(c) {
  const e = {};
  if (!c.nombre) e.Nombre = 'required';
  if (!c.correo) e.Email = 'required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.correo)) e.Email = 'invalid';
  if (c.telefono && !/^[\d\s+()-]{7,20}$/.test(c.telefono)) e.Telefono = 'invalid';
  if (!c.mensaje) e.Mensaje = 'required';
  // Enlaces masivos: típico del spam
  if ((c.mensaje.match(/https?:\/\//gi) || []).length > 3) e.Mensaje = 'spam';
  return e;
}

// Si un valor empieza por = + - @ (o tabulación/retorno), la hoja lo interpretaría como fórmula
function seguroParaHoja_(v) {
  const s = String(v == null ? '' : v);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

function generarId_() {
  const sello = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyyMMdd-HHmmss');
  return 'NT-' + sello + '-' + Utilities.getUuid().slice(0, 4).toUpperCase();
}

function huella_(texto) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, texto.toLowerCase().replace(/\s+/g, ' '));
  return Utilities.base64EncodeWebSafe(bytes).slice(0, 32);
}

function hoja_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sh) throw new Error('No existe la pestaña "' + CONFIG.SHEET_NAME + '". Ejecute configurar().');
  return sh;
}

function responder_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function escaparHtml_(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Aviso al propietario de la hoja (la misma cuenta que publicó el script)
function notificar_(id) {
  const sh = hoja_();
  const ultima = sh.getLastRow();
  const valores = sh.getRange(ultima, 1, 1, CONFIG.HEADERS.length).getValues()[0];
  if (valores[0] !== id) return; // seguridad: solo se notifica la fila recién creada

  const destino = Session.getEffectiveUser().getEmail();
  const url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  const filas = CONFIG.HEADERS.map(function (h, i) {
    return '<tr><td style="padding:6px 12px;color:#506273;font-weight:600;vertical-align:top">' + h +
      '</td><td style="padding:6px 12px;white-space:pre-wrap">' + escaparHtml_(String(valores[i]).replace(/^'/, '')) + '</td></tr>';
  }).join('');

  MailApp.sendEmail({
    to: destino,
    replyTo: String(valores[3]),
    name: 'Formulario NETWORKING TIC',
    subject: 'Nuevo mensaje de contacto: ' + String(valores[2]).replace(/^'/, '') + ' (' + id + ')',
    htmlBody:
      '<div style="font-family:Arial,sans-serif;font-size:14px;color:#0d2131">' +
      '<h2 style="color:#1271b2;margin:0 0 12px">Nuevo mensaje desde la página web</h2>' +
      '<table style="border-collapse:collapse;border:1px solid #d6dfe6">' + filas + '</table>' +
      '<p style="margin-top:16px"><a href="' + url + '">Abrir REGISTRO_CONTACTOS_PLATAFORMA</a></p>' +
      '<p style="color:#506273;font-size:12px">Puede responder este correo directamente: la respuesta irá al correo del cliente.</p></div>',
  });
}
