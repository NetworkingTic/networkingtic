import { CSSProperties, useEffect, useState } from "react";
import logo from "@assets/logo-networking-tic.webp";
import "./BrandIntro.css";

// Presentación de bienvenida con el logo oficial (la misma imagen del encabezado, sin modificar).
// - Se muestra una sola vez por visita (no se repite al navegar entre secciones).
// - Dura unos 2,6 s; se puede saltar con clic, tecla o rueda del mouse.
// - Si el visitante pidió "reducir movimiento" en su sistema, no se muestra.
// - Solo usa CSS (opacidad, transformaciones y recortes): no carga librerías ni frena la página.

const SESSION_KEY = "ntic-intro-vista";
const DURATION = 2600; // ms hasta empezar a salir
const EXIT = 650; // ms de la transición de salida

const shouldShow = () => {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return false;
  } catch {
    /* sin acceso a sessionStorage: se muestra igual */
  }
  return !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
};

export const BrandIntro = () => {
  const [phase, setPhase] = useState<"on" | "leaving" | "done">(() => (shouldShow() ? "on" : "done"));

  useEffect(() => {
    if (phase !== "on") return;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignorar */
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const leave = () => setPhase((p) => (p === "on" ? "leaving" : p));
    const timer = window.setTimeout(leave, DURATION);
    window.addEventListener("keydown", leave);
    window.addEventListener("wheel", leave, { passive: true });
    window.addEventListener("touchmove", leave, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", leave);
      window.removeEventListener("wheel", leave);
      window.removeEventListener("touchmove", leave);
      document.body.style.overflow = prevOverflow;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = window.setTimeout(() => setPhase("done"), EXIT);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === "done") return null;

  // El logo se usa como máscara para que la luz recorra exactamente su forma
  const maskStyle = { "--logo-url": `url(${logo})` } as CSSProperties;

  return (
    <div
      className={`brand-intro${phase === "leaving" ? " is-leaving" : ""}`}
      aria-hidden="true"
      onClick={() => setPhase("leaving")}
    >
      <div className="brand-intro__grid" />
      <div className="brand-intro__glow" />
      <div className="brand-intro__stage" style={maskStyle}>
        <div className="brand-intro__ring" />
        <img className="brand-intro__logo" src={logo} alt="" width={308} height={269} />
        <div className="brand-intro__scan" />
        <div className="brand-intro__shine" />
      </div>
      <div className="brand-intro__bar">
        <span />
      </div>
    </div>
  );
};
