import { CSSProperties, useEffect, useState } from "react";
import logo from "@assets/logo-networking-tic.webp";
import "./BrandIntro.css";

// Presentación de bienvenida con el logo oficial (la misma imagen del encabezado, sin modificar).
// - Se muestra SIEMPRE que se carga o recarga la página (F5, Ctrl + R, botón actualizar, nueva visita).
//   No guarda nada en el navegador: no usa localStorage, sessionStorage ni cookies.
// - Al moverse entre secciones con el menú no se repite, porque la página no se recarga.
// - Dura unos 2,6 s; se puede saltar con clic, tecla o rueda del mouse.
// - Solo usa CSS (opacidad, transformaciones y recortes): no carga librerías ni frena la página.

const DURATION = 2600; // ms hasta empezar a salir
const EXIT = 650; // ms de la transición de salida

export const BrandIntro = () => {
  const [phase, setPhase] = useState<"on" | "leaving" | "done">("on");

  useEffect(() => {
    if (phase !== "on") return;
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
