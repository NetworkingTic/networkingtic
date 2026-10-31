import { Alert, Box, Button, CircularProgress, Container, Grid2, Snackbar } from "@mui/material";
import "./ContactForm.css";
import { Formik } from "formik";
import { useContactForm } from "./useContactForm";
import { CustomTextField } from "./CustomTextField";

export const ContactForm: React.FC = () => {
  const { initialValues, validate, handleOnSubmit, status, setStatus } = useContactForm();
  return (
    <section className="container-form">
      <Container>
        <Grid2 container spacing={4}>
          <Grid2 size={{ md: 4, xs: 12 }}>
            <Box>
              <h2>¡Contáctanos!</h2>
              <p>
                ¿Tienes alguna duda o comentario? Escríbenos y nos pondremos en
                contacto contigo lo antes posible.
              </p>
            </Box>
          </Grid2>
          <Grid2 size={{ md: 8, xs: 12 }}>
            <Box>
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={async (values, { resetForm }) => {
                  const ok = await handleOnSubmit(values);
                  if (ok) resetForm();
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit} noValidate>
                      <Grid2 container spacing={2}>
                        <Grid2 size={{ md: 6, xs: 12 }}>
                          <CustomTextField
                            type="text"
                            name="Nombre"
                            label="Nombre"
                            value={values.Nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Nombre && Boolean(errors.Nombre)}
                            helperText={touched.Nombre ? errors.Nombre : undefined}
                            autoComplete="name"
                            required
                          />
                        </Grid2>
                        <Grid2 size={{ md: 6, xs: 12 }}>
                          <CustomTextField
                            type="email"
                            name="Email"
                            label="Email"
                            value={values.Email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Email && Boolean(errors.Email)}
                            helperText={touched.Email ? errors.Email : undefined}
                            autoComplete="email"
                            required
                          />
                        </Grid2>
                        <Grid2 size={{ md: 12, xs: 12 }}>
                          <CustomTextField
                            type="text"
                            name="NombreEmpresa"
                            label="Nombre de la empresa"
                            value={values.NombreEmpresa}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.NombreEmpresa && Boolean(errors.NombreEmpresa)}
                            helperText={touched.NombreEmpresa ? errors.NombreEmpresa : undefined}
                            autoComplete="organization"
                          />
                        </Grid2>
                        <Grid2 size={{ md: 6, xs: 12 }}>
                          <CustomTextField
                            type="tel"
                            name="Telefono"
                            label="Teléfono"
                            value={values.Telefono}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Telefono && Boolean(errors.Telefono)}
                            helperText={touched.Telefono ? errors.Telefono : undefined}
                            autoComplete="tel"
                          />
                        </Grid2>
                        <Grid2 size={{ md: 6, xs: 12 }}>
                          <CustomTextField
                            type="text"
                            name="Ciudad"
                            label="Ciudad"
                            value={values.Ciudad}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Ciudad && Boolean(errors.Ciudad)}
                            helperText={touched.Ciudad ? errors.Ciudad : undefined}
                            autoComplete="address-level2"
                          />
                        </Grid2>
                        <Grid2 size={{ md: 12, xs: 12 }}>
                          <CustomTextField
                            type="text"
                            name="Mensaje"
                            label="Mensaje"
                            value={values.Mensaje}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.Mensaje && Boolean(errors.Mensaje)}
                            helperText={touched.Mensaje ? errors.Mensaje : undefined}
                            autoComplete="off"
                            required
                            multiline
                          />
                        </Grid2>
                        <Grid2 size={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : undefined}
                          >
                            {isSubmitting ? "Enviando..." : "Enviar"}
                          </Button>
                        </Grid2>
                      </Grid2>
                    </form>
                )}
              </Formik>
              <Snackbar
                open={status !== "idle"}
                autoHideDuration={6000}
                onClose={() => setStatus("idle")}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert
                  onClose={() => setStatus("idle")}
                  severity={status === "error" ? "error" : "success"}
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  {status === "error"
                    ? "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp."
                    : "¡Gracias! Recibimos tu mensaje y te contactaremos pronto."}
                </Alert>
              </Snackbar>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </section>
  );
};
