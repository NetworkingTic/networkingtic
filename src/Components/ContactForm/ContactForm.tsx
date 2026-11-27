import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik, FormikErrors } from "formik";
import { Alert, CircularProgress, Snackbar, TextField } from "@mui/material";
import { useLanguage } from "../../i18n/LanguageContext";
import "./ContactForm.css";

// URL /exec del Google Apps Script PROPIO de NETWORKING TIC (ver google-apps-script/Code.gs).
// Guarda cada mensaje en la hoja REGISTRO_CONTACTOS_PLATAFORMA y avisa por Gmail.
// Es una dirección pública por diseño: no contiene contraseñas ni credenciales.
// Se puede cambiar sin tocar el código con la variable VITE_CONTACT_ENDPOINT.
const CONTACT_ENDPOINT: string =
  import.meta.env.VITE_CONTACT_ENDPOINT ??
  "https://script.google.com/macros/s/AKfycbwLLvIW_-oV65aUSjevhd4Cswuwg9v6yKU29Rgk9J4z3rQPk96iZjy0I1cKD5H66A-7Uw/exec";

const TIMEOUT_MS = 20000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Los nombres de campo se mantienen igual que antes para no romper la hoja de Google.
type Values = {
  Nombre: string;
  Email: string;
  NombreEmpresa: string;
  Telefono: string;
  Ciudad: string;
  Mensaje: string;
};

const initialValues: Values = { Nombre: "", Email: "", NombreEmpresa: "", Telefono: "", Ciudad: "", Mensaje: "" };

export const ContactForm = () => {
  const { t } = useLanguage();
  const f = t.form;
  const [status, setStatus] = useState<"idle" | "success" | "error" | "rate">("idle");
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  // Antispam: momento en que se abrió el formulario e identificador del envío (evita duplicados)
  const startedAt = useRef(Date.now());
  const submissionId = useRef("");
  const honeypot = useRef<HTMLInputElement>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const newId = () =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

  const validate = (v: Values) => {
    const e: FormikErrors<Values> = {};
    if (!v.Nombre.trim()) e.Nombre = f.errors.name;
    if (!v.Email.trim()) e.Email = f.errors.email;
    else if (!EMAIL_REGEX.test(v.Email.trim())) e.Email = f.errors.emailInvalid;
    if (v.Telefono && !/^[\d\s+()-]{7,20}$/.test(v.Telefono)) e.Telefono = f.errors.phone;
    if (!v.Mensaje.trim()) e.Mensaje = f.errors.message;
    return e;
  };

  type ServerReply = { ok?: boolean; id?: string | null; code?: string; fields?: Record<string, string> };

  // Envía el mensaje y espera la confirmación REAL del script (no se simula el éxito).
  // Se usa texto plano para que el navegador no haga una consulta previa (CORS) que Apps Script no admite.
  const send = async (values: Values, setErrors: (e: FormikErrors<Values>) => void) => {
    if (!CONTACT_ENDPOINT) {
      console.error("Formulario sin configurar: falta VITE_CONTACT_ENDPOINT");
      setStatus("error");
      return false;
    }
    if (!submissionId.current) submissionId.current = newId(); // se conserva si hay que reintentar

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          ...values,
          origen: `${pathname} | ${lang}`,
          website: honeypot.current?.value ?? "",
          elapsedMs: Date.now() - startedAt.current,
          submissionId: submissionId.current,
        }),
        redirect: "follow",
        signal: controller.signal,
      });
      const reply = (await res.json()) as ServerReply;

      if (reply.ok) {
        setStatus("success");
        submissionId.current = ""; // el próximo mensaje será un envío nuevo
        startedAt.current = Date.now();
        return true;
      }
      if (reply.code === "VALIDATION" && reply.fields) {
        const map: Record<string, string> = {
          Nombre: f.errors.name,
          Email: reply.fields.Email === "invalid" ? f.errors.emailInvalid : f.errors.email,
          Telefono: f.errors.phone,
          Mensaje: f.errors.message,
        };
        const errs: FormikErrors<Values> = {};
        Object.keys(reply.fields).forEach((k) => {
          if (k in map) errs[k as keyof Values] = map[k];
        });
        setErrors(errs);
        return false;
      }
      setStatus(reply.code === "RATE_LIMIT" ? "rate" : "error");
      return false;
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      setStatus("error");
      return false;
    } finally {
      window.clearTimeout(timer);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={async (values, { resetForm, setErrors, setTouched }) => {
          const ok = await send(values, (e) => {
            setTouched({ Nombre: true, Email: true, Telefono: true, Mensaje: true });
            setErrors(e);
          });
          if (ok) resetForm();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
          const MAX: Record<keyof Values, number> = { Nombre: 100, Email: 254, NombreEmpresa: 150, Telefono: 20, Ciudad: 80, Mensaje: 3000 };
          const field = (name: keyof Values, label: string, extra: Record<string, unknown> = {}) => (
            <TextField
              name={name}
              label={label}
              value={values[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched[name] && errors[name])}
              helperText={touched[name] ? errors[name] : undefined}
              fullWidth
              inputProps={{ maxLength: MAX[name] }}
              {...extra}
            />
          );
          return (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {/* Campo trampa para robots: invisible para las personas y para lectores de pantalla */}
              <input
                ref={honeypot}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="contact-form__trap"
                defaultValue=""
              />
              <div className="contact-form__grid">
                {field("Nombre", f.name, { required: true, autoComplete: "name" })}
                {field("Email", f.email, { required: true, type: "email", autoComplete: "email" })}
                {field("NombreEmpresa", f.company, { autoComplete: "organization" })}
                {field("Telefono", f.phone, { type: "tel", autoComplete: "tel" })}
                <div className="contact-form__full">{field("Ciudad", f.city, { autoComplete: "address-level2" })}</div>
                <div className="contact-form__full">
                  {field("Mensaje", f.message, { required: true, multiline: true, minRows: 4 })}
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting && <CircularProgress size={16} color="inherit" />}
                {isSubmitting ? f.sending : f.submit}
              </button>
            </form>
          );
        }}
      </Formik>

      <Snackbar
        open={status !== "idle"}
        autoHideDuration={6000}
        onClose={() => setStatus("idle")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setStatus("idle")}
          severity={status === "success" ? "success" : status === "rate" ? "warning" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {status === "success" ? f.success : status === "rate" ? f.rateLimit : f.error}
        </Alert>
      </Snackbar>
    </>
  );
};
