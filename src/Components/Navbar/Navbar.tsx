import { PointerEvent, useEffect, useRef, useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link as RouterLink, NavLink } from "react-router-dom";
import { Brand } from "../Brand/Brand";
import { useLanguage } from "../../i18n/LanguageContext";
import { useThemeMode } from "../../theme/ThemeContext";
import "./Navbar.css";

const LanguageSwitch = () => {
  const { lang, setLang, t } = useLanguage();
  return (
    <div className="lang-switch" role="group" aria-label={t.nav.language}>
      {(["es", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          className={lang === code ? "is-active" : undefined}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          lang={code}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

const ThemeToggle = () => {
  const { mode, toggleMode } = useThemeMode();
  const { t } = useLanguage();
  const label = mode === "dark" ? t.nav.switchToLight : t.nav.switchToDark;
  return (
    <button type="button" className="icon-btn" onClick={toggleMode} aria-label={label} title={label}>
      {mode === "dark" ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
    </button>
  );
};

export const Navbar = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pestañas flotantes: pulso de luz al activar una pestaña y luz que sigue al cursor
  const [pulse, setPulse] = useState("");
  const pulseTimer = useRef(0);
  useEffect(() => () => window.clearTimeout(pulseTimer.current), []);
  const firePulse = (to: string) => {
    window.clearTimeout(pulseTimer.current);
    setPulse("");
    requestAnimationFrame(() => setPulse(to));
    pulseTimer.current = window.setTimeout(() => setPulse(""), 900);
  };
  const trackPointer = (e: PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const tabClass = (to: string) => ({ isActive }: { isActive: boolean }) =>
    `ntab${isActive ? " active" : ""}${pulse === to ? " is-pulsing" : ""}`;

  const links = [
    { to: "/", label: t.nav.home, end: true },
    { to: "/servicios", label: t.nav.services },
    { to: "/partners", label: t.nav.partners },
    { to: "/conocenos", label: t.nav.about },
    { to: "/contactanos", label: t.nav.contact },
  ];

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap site-header__inner">
        <Brand />

        <nav className="main-nav" aria-label="Principal">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={tabClass(l.to)}
              onClick={() => firePulse(l.to)}
              onPointerMove={trackPointer}
              onPointerDown={trackPointer}
            >
              <span className="ntab__label">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="site-header__tools">
          <LanguageSwitch />
          <ThemeToggle />
          <RouterLink to="/contactanos" className="btn btn-primary header-cta">
            {t.nav.cta}
          </RouterLink>
          <IconButton className="menu-btn" aria-label={t.nav.openMenu} onClick={() => setOpen(true)} sx={{ color: "inherit" }}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="mobile-nav">
          <div className="mobile-nav__top">
            <LanguageSwitch />
            <ThemeToggle />
            <IconButton aria-label={t.nav.closeMenu} onClick={() => setOpen(false)} sx={{ color: "inherit", ml: "auto" }}>
              <CloseIcon />
            </IconButton>
          </div>
          <nav aria-label="Principal">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={tabClass(l.to)}
                onPointerDown={trackPointer}
                onClick={() => {
                  firePulse(l.to);
                  // se deja ver el destello un instante antes de cerrar el menú (la navegación ya ocurrió)
                  window.setTimeout(() => setOpen(false), 280);
                }}
              >
                <span className="ntab__label">{l.label}</span>
              </NavLink>
            ))}
          </nav>
          <RouterLink to="/contactanos" className="btn btn-primary" onClick={() => setOpen(false)}>
            {t.nav.cta}
          </RouterLink>
        </div>
      </Drawer>
    </header>
  );
};
