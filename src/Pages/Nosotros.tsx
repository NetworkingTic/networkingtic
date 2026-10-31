import React from "react";
import { Container, Typography, Box, Grid2 } from "@mui/material";
import visionMisionImage from "@assets/vision-mision.jpg";

export const Nosotros: React.FC = () => {
  return (
    <Container>
      <Box sx={{ my: 4, paddingBottom: 5 }} className = 'card-text-container'>
        <Typography variant="h4" component="h1" gutterBottom align="center" padding={4}>
          Nosotros
        </Typography>
        <Grid2 container spacing={4} alignItems="center">
          <Grid2 size={{xs:12, md:6}}>
            <Box sx={{ textAlign: "center" }}>
              <img src={visionMisionImage} alt="Visión y Misión" style={{ width: "80%", borderRadius: "8px" }} />
            </Box>
          </Grid2>
          <Grid2 size={{xs:12, md:6}}>
            <Box sx={{ p: 2, }} >
              <Typography variant="h5" component="h2" gutterBottom>
                Misión
              </Typography>
              <Typography variant="body1" gutterBottom>
                NETWORKING TIC S.A.S es una empresa que facilita, mejora y optimiza procesos y la gestión de nuestros clientes a través de la implementación de tecnologías seguras, protegiendo sus datos con sistemas confiables, ofreciendo soluciones integrales e inteligentes con altos estándares de calidad.
              </Typography>
              <br />
              <br />
              <br />
              <Typography variant="h5" component="h2" gutterBottom>
                Visión
              </Typography>
              <Typography variant="body1">
                NETWORKING TIC S.A.S será una empresa reconocida a nivel nacional e internacional, siendo líderes en la generación de soluciones innovadoras y avances tecnológicos en el desarrollo de implementación de tecnologías seguras.
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};