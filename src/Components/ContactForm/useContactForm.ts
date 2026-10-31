import { useState } from "react";
import { FormikErrors } from "formik";
import { TContact } from "./ContactModel";

// URL del Google Apps Script que guarda los mensajes en una hoja de cálculo.
// Se puede cambiar sin tocar el código creando la variable VITE_CONTACT_ENDPOINT en el hosting.
const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT ??
  "https://script.google.com/macros/s/AKfycbzwJz00G1FrVa9RLHN93RVX4hA_KrYzEfQSQqgpawIbEZgbDryqsCajelHU-85bPm6Jqg/exec";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type SubmitStatus = "idle" | "success" | "error";

export const useContactForm = () => {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const initialValues: TContact = {
    Nombre: "",
    Email: "",
    Mensaje: "",
    Telefono: "",
    Ciudad: "",
    NombreEmpresa: "",
  };

  const validate = (values: TContact): FormikErrors<TContact> => {
    const errors: FormikErrors<TContact> = {};
    if (!values.Nombre.trim()) errors.Nombre = "Escribe tu nombre";
    if (!values.Email.trim()) errors.Email = "Escribe tu correo";
    else if (!EMAIL_REGEX.test(values.Email.trim())) errors.Email = "Correo no válido";
    if (values.Telefono && !/^[\d\s+()-]{7,20}$/.test(values.Telefono))
      errors.Telefono = "Teléfono no válido";
    if (!values.Mensaje.trim()) errors.Mensaje = "Cuéntanos en qué te podemos ayudar";
    return errors;
  };

  // Devuelve true si el envío salió bien, para que el formulario se limpie solo en ese caso.
  const handleOnSubmit = async (values: TContact): Promise<boolean> => {
    setStatus("idle");
    try {
      await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(values),
      });
      // En modo no-cors Google no devuelve detalles: si no hubo error de red, se da por enviado.
      setStatus("success");
      return true;
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      setStatus("error");
      return false;
    }
  };

  return { initialValues, validate, handleOnSubmit, status, setStatus };
};
