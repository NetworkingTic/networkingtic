# NetWorking TIC — Sitio web

Sitio corporativo de **NETWORKING TIC S.A.S** (Bogotá, Colombia): servicios de virtualización, redes, cableado estructurado, Windows Server, almacenamiento, ciberseguridad (partners Kaspersky) y soporte técnico.

Hecho con **React 18 + TypeScript + Vite** y **Material UI**.

## Requisitos

- [Node.js](https://nodejs.org/) 20 o superior (incluye `npm`)
- Git

## Trabajar en tu computador

```bash
git clone https://github.com/AndresPk05/networkingTic.git
cd networkingTic
npm install        # instala las dependencias (solo la primera vez)
npm run dev        # abre el sitio en http://localhost:5173 y se recarga al guardar
```

Antes de publicar, comprueba que compila sin errores:

```bash
npm run build      # genera la carpeta dist/ con el sitio listo para producción
npm run preview    # sirve dist/ en http://localhost:4173 para revisarlo
```

## Estructura

| Carpeta / archivo | Qué contiene |
|---|---|
| `src/Pages/` | Las páginas: Inicio, Servicios, Partners, Nosotros, Contáctanos |
| `src/Components/` | Menú, pie de página, formulario, carrusel, botones flotantes, fondo animado |
| `src/mocks/CardMock.ts` | Textos e imágenes de cada servicio (aquí se editan los servicios) |
| `src/assets/` | Imágenes |
| `public/` | Archivos que se copian tal cual: `favicon.ico`, `robots.txt` |
| `staticwebapp.config.json` | Rutas para Azure Static Web Apps |
| `vercel.json` | Rutas para Vercel |

## Formulario de contacto

Los mensajes se envían a un Google Apps Script que los guarda en una hoja de Google. Para usar otro script sin tocar el código, crea en el hosting la variable de entorno:

```
VITE_CONTACT_ENDPOINT=https://script.google.com/macros/s/TU_ID/exec
```

## Publicar (producción)

El sitio es estático: `npm run build` genera `dist/` y eso se sube a cualquier hosting estático. Hay dos opciones ya configuradas.

### Opción A — Vercel (recomendada, gratis)

1. Entra a <https://vercel.com> e inicia sesión con GitHub.
2. **Add New → Project** y elige este repositorio.
3. Vercel detecta Vite solo: *Build Command* `npm run build`, *Output Directory* `dist`.
4. **Deploy**. En 1–2 minutos queda en `https://<nombre>.vercel.app`.
5. Cada `git push` a `main` vuelve a publicar automáticamente.

### Opción B — Azure Static Web Apps (gratis)

Configuración correcta: `app_location: "/"`, `output_location: "dist"`.

Para crearlo desde cero en otra cuenta: Portal de Azure → *Static Web Apps* → Crear → plan *Free* → origen GitHub → este repositorio, rama `main` → preset *React* → *Output location* `dist`. Azure agrega el workflow al repositorio.

### Dominio propio (ej. `networkingtic.com.co`)

1. En el hosting: **Settings → Domains** (Vercel) o **Custom domains** (Azure) → agrega el dominio.
2. En el proveedor del dominio, crea los registros DNS que te indica el hosting (normalmente un `CNAME` para `www` y un `A`/`ALIAS` para el dominio raíz).
3. El certificado HTTPS se genera solo. Los cambios de DNS pueden tardar hasta 24–48 h.

### Lista de chequeo antes de salir a producción

- [ ] `npm run build` termina sin errores
- [ ] Las 5 secciones abren y **recargar la página (F5) en cada una no da error 404**
- [ ] El formulario muestra "¡Gracias!" y el mensaje llega a la hoja de Google
- [ ] El botón de WhatsApp abre el chat correcto
- [ ] Se ve bien en celular
- [ ] Con el dominio listo, registrarlo en [Google Search Console](https://search.google.com/search-console)
