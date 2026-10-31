import React from "react";
import { Container, Typography, Box, Grid2 } from "@mui/material";
import kasperskyImage from "@assets/kasperky-parnet.jpg"; // Asegúrate de tener la imagen en la carpeta assets

export const Partners: React.FC = () => {
  return (
    <Container>
      <Box sx={{ my: 4, padding: 5 }} className = 'card-text-container'>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          ¡Socios Oficiales de Kaspersky!
        </Typography>
        <Grid2 container spacing={4} alignItems="center">
          <Grid2 size={{xs:12, md:6}}>
            <Box sx={{ p: 2 }}>
              <Typography variant="body1" gutterBottom sx={{marginBottom: 5}}>
                Como partners de una de las mayores autoridades en ciberseguridad, ofrecemos a nuestros clientes acceso exclusivo a soluciones avanzadas de Kaspersky, garantizando una protección de última generación frente a amenazas digitales. Al elegirnos, obtienes:
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ ml: 2 }}>
                <strong>Seguridad Avanzada:</strong> Protección integral contra malware, ransomware y otras amenazas cibernéticas.
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ ml: 2 }}>
                <strong>Optimización de Recursos:</strong> Soluciones personalizadas para maximizar la eficiencia y rendimiento de tu infraestructura.
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ ml: 2 }}>
                <strong>Soporte Especializado:</strong> Acceso directo a soporte técnico certificado por Kaspersky, con respuesta rápida y prioritaria.
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ ml: 2 }}>
                <strong>Innovación Constante:</strong> Benefíciate de las últimas innovaciones y actualizaciones de seguridad cibernética para mantener tus datos a salvo.
              </Typography>
              <Typography variant="body1" sx={{marginTop: 5}}>
                Confía en un equipo comprometido con la seguridad de tu negocio, respaldado por la tecnología de Kaspersky.
              </Typography>
            </Box>
          </Grid2>
          <Grid2 size={{xs:12, md:6}}>
            <Box sx={{ textAlign: "center" }}>
              <img src={kasperskyImage} alt="Kaspersky" style={{ width: "80%", borderRadius: "8px" }} />
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};