import { Facebook } from "@mui/icons-material";
import { Box, Container, Grid2, Link, Typography } from "@mui/material";
import logo from "@assets/logo4.jpeg";
import "../Footer/footerStyle.css";
import { TikTokIcon } from "../IconsCustom/TikTokIcon";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { Link as RouterLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Grid2 container spacing={4}>
          <Grid2 size={{ md: 4, xs: 12 }}>
            <Box className="footer-logo">
              <img src={logo} alt="Logo de la empresa" />
            </Box>
          </Grid2>
          <Grid2 size={{ md: 4, xs: 12 }}>
            <Box className="footer-links">
              <Link component={RouterLink} to="/" color="inherit" underline="none">
                Inicio
              </Link>
              <Link component={RouterLink} to="/servicios" color="inherit" underline="none">
                Servicios
              </Link>
              <Link component={RouterLink} to="/conocenos" color="inherit" underline="none">
                Quiénes somos
              </Link>
              <Link component={RouterLink} to="/contactanos" color="inherit" underline="none">
                Contáctanos
              </Link>
              <Typography>Bogotá, Colombia</Typography>
            </Box>
          </Grid2>
          <Grid2 size={{ md: 4, xs: 12 }}>
            <Box className="footer-social">
              <Typography variant="h6">Síguenos</Typography>
              <Link
                href="https://www.facebook.com/profile.php?id=100091906721223"
                color="inherit"
                underline="none"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box className="container-icons">
                  <Facebook />
                  <Typography>&nbsp;Facebook</Typography>
                </Box>
              </Link>
              <Link
                href="https://vm.tiktok.com/ZMhx1pWLA/"
                color="inherit"
                underline="none"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box className="container-icons">
                  <TikTokIcon />
                  <Typography>TikTok</Typography>
                </Box>
              </Link>
              <Link href="tel:+573246365743" color="inherit" underline="none">
                <Box className="container-icons">
                  <ContactPhoneIcon />
                  <Typography>&nbsp;+57 324 636 5743</Typography>
                </Box>
              </Link>
              <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
                © {new Date().getFullYear()} NETWORKING TIC S.A.S
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </footer>
  );
};
