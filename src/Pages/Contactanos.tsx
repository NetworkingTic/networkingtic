import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { ContactForm } from "../Components/ContactForm/ContactForm";

export const Contactanos: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 19.5rem)",
      }}
    >
      <Container>
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Contáctanos
          </Typography>
          <Typography variant="body1" gutterBottom>
            ¿Tienes alguna duda o comentario? Escríbenos y nos pondremos en contacto contigo lo antes posible.
          </Typography>
          <ContactForm />
        </Box>
      </Container>
    </Box>
  );
};