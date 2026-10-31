import "./global.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { Home } from "./Pages/Home/Home";
import { FloatingButtons } from "./Components/FloatingButtons/FloatingButton";
import { createTheme, ThemeProvider } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { Footer } from "./Components/Footer/Footer";
import { Contactanos } from "./Pages/Contactanos";
import { Nosotros } from "./Pages/Nosotros";
import { Partners } from "./Pages/Partners";
import { Services } from "./Pages/Services/Services";
import AnimatedGraphBackground from "./Components/NetWork/NetworkAnimation";
const theme = createTheme({
  palette: {
    primary: {
      main: "#0077B6",
      contrastText: "#ffffff", // Color de texto blanco para botones primarios
    },
    secondary: {
      main: green[500],
      contrastText: "#ffffff", // Color de texto blanco para botones secundarios
    },
    text: {
      primary: "#ffffff", // Color de texto principal blanco
      secondary: "#000000", // Color de texto secundario blanco
    },
    action: {
      active: "#ffffff", // Color de texto activo blanco
    },
  },
  typography: {
    fontFamily: 'Open Sans',
  },
});

// Al cambiar de sección, vuelve al inicio de la página y actualiza el título de la pestaña
const TITLES: Record<string, string> = {
  "/": "NetWorking TIC | Soporte IT, redes y ciberseguridad en Bogotá",
  "/servicios": "Servicios | NetWorking TIC",
  "/partners": "Partners Kaspersky | NetWorking TIC",
  "/conocenos": "Nosotros | NetWorking TIC",
  "/contactanos": "Contáctanos | NetWorking TIC",
};

const RouteEffects = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = TITLES[pathname] ?? TITLES["/"];
  }, [pathname]);
  return null;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <RouteEffects />
      <AnimatedGraphBackground
        width="100%"
        height="100%"
        nodeColor="#3498db"
        edgeColor="#7f8c8d"
        backgroundColor="#ffffff"
      />
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/conocenos" element={<Nosotros />} />
            <Route path="/contactanos" element={<Contactanos />} />
            <Route path="/nosotros" element={<Navigate to="/conocenos" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <FloatingButtons />
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
