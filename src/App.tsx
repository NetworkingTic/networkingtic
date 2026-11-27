import { useEffect } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeModeProvider } from "./theme/ThemeContext";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import { Navbar } from "./Components/Navbar/Navbar";
import { Footer, WhatsAppButton } from "./Components/Footer/Footer";
import { Home } from "./Pages/Home";
import { Servicios } from "./Pages/Servicios";
import { Partners } from "./Pages/Partners";
import { Nosotros } from "./Pages/Nosotros";
import { Contactanos } from "./Pages/Contactanos";
import "./styles.css";

// Al cambiar de página: título de la pestaña en el idioma activo y scroll al inicio (o a la sección #ancla).
const RouteEffects = () => {
  const { pathname, hash } = useLocation();
  const { t, lang } = useLanguage();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": t.meta.home,
      "/servicios": t.meta.services,
      "/partners": t.meta.partners,
      "/conocenos": t.meta.about,
      "/contactanos": t.meta.contact,
    };
    document.title = titles[pathname] ?? t.meta.home;
  }, [pathname, lang, t]);

  useEffect(() => {
    if (hash) {
      // Espera a que la página pinte antes de buscar la sección
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const SkipLink = () => {
  const { lang } = useLanguage();
  return (
    <a className="skip-link" href="#contenido">
      {lang === "es" ? "Saltar al contenido" : "Skip to content"}
    </a>
  );
};

function App() {
  return (
    <ThemeModeProvider>
      <LanguageProvider>
        <Router>
          <RouteEffects />
          <SkipLink />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/conocenos" element={<Nosotros />} />
            <Route path="/contactanos" element={<Contactanos />} />
            <Route path="/nosotros" element={<Navigate to="/conocenos" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
        </Router>
      </LanguageProvider>
    </ThemeModeProvider>
  );
}

export default App;
