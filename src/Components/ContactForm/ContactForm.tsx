import { useState } from "react";
import { Formik, FormikErrors } from "formik";
import { Alert, CircularProgress, Snackbar, TextField } from "@mui/material";
import { useLanguage } from "../../i18n/LanguageContext";
import "./ContactForm.css";

// URL del Google Apps Script que guarda los mensajes en una hoja de cálculo.
// Se puede cambiar sin tocar el código con la variable VITE_CONTACT_ENDPOINT.
const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT ??
  "https://script.google.com/macros/s/AKfycbzwJz00G1FrVa9RLHN93RVX4hA_KrYzEfQSQqgpawIbEZgbDryqsCajelHU-85bPm6Jqg/exec";

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
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = (v: Values) => {
    const e: FormikErrors<Values> = {};
    if (!v.Nombre.trim()) e.Nombre = f.errors.name;
    if (!v.Email.trim()) e.Email = f.errors.email;
    else if (!EMAIL_REGEX.test(v.Email.trim())) e.Email = f.errors.emailInvalid;
    if (v.Telefono && !/^[\d\s+()-]{7,20}$/.test(v.Telefono)) e.Telefono = f.errors.phone;
    if (!v.Mensaje.trim()) e.Mensaje = f.errors.message;
    return e;
  };

  const send = async (values: Values) => {
    try {
      await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(values),
      });
      setStatus("success");
      return true;
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      setStatus("error");
      return false;
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={async (values, { resetForm }) => {
          if (await send(values)) resetForm();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
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
              {...extra}
            />
          );
          return (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
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
        <Alert onClose={() => setStatus("idle")} severity={status === "error" ? "error" : "success"} variant="filled" sx={{ width: "100%" }}>
          {status === "error" ? f.error : f.success}
        </Alert>
      </Snackbar>
    </>
  );
};
