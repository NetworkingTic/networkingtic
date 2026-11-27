import { ComponentType } from "react";

// Íconos animados propios de cada servicio (SVG dibujado a línea).
// Las animaciones se activan con la clase "is-live" (servicio seleccionado o con el cursor encima);
// el resto del tiempo quedan quietos para no distraer ni gastar recursos.

const common = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// Capas que flotan: varios servidores virtuales sobre un mismo equipo
const Virtualizacion = () => (
  <svg {...common} className="svc-ico ico-virt">
    <rect className="l3" x="12" y="8" width="26" height="9" rx="2.5" />
    <rect className="l2" x="9" y="19" width="26" height="9" rx="2.5" />
    <rect className="l1" x="6" y="30" width="26" height="9" rx="2.5" />
    <circle cx="11" cy="34.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="14" cy="23.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="17" cy="12.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// Servidor con luces de actividad que se encienden en secuencia
const WindowsServer = () => (
  <svg {...common} className="svc-ico ico-win">
    <rect x="10" y="6" width="28" height="36" rx="3" />
    <path d="M10 18h28M10 30h28" />
    <path d="M15 12h9M15 24h9M15 36h9" />
    <circle className="led a" cx="32" cy="12" r="1.6" fill="currentColor" stroke="none" />
    <circle className="led b" cx="32" cy="24" r="1.6" fill="currentColor" stroke="none" />
    <circle className="led c" cx="32" cy="36" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

// Cilindro de datos con un anillo de lectura que lo recorre
const Almacenamiento = () => (
  <svg {...common} className="svc-ico ico-stor">
    <ellipse cx="24" cy="11" rx="14" ry="5" />
    <path d="M10 11v26c0 2.8 6.3 5 14 5s14-2.2 14-5V11" />
    <path d="M10 20c0 2.8 6.3 5 14 5s14-2.2 14-5M10 29c0 2.8 6.3 5 14 5s14-2.2 14-5" opacity=".5" />
    <path className="ring" d="M10 20c0 2.8 6.3 5 14 5s14-2.2 14-5" />
  </svg>
);

// Nodos conectados con paquetes viajando por los enlaces
const Redes = () => (
  <svg {...common} className="svc-ico ico-net">
    <path d="M24 24 10 11M24 24l14-13M24 24 10 37M24 24l14 13" opacity=".45" />
    <path className="flow" d="M24 24 10 11M24 24l14-13M24 24 10 37M24 24l14 13" />
    <circle cx="24" cy="24" r="4.5" />
    <circle cx="10" cy="11" r="3" />
    <circle cx="38" cy="11" r="3" />
    <circle cx="10" cy="37" r="3" />
    <circle cx="38" cy="37" r="3" />
  </svg>
);

// Cables que se trazan hacia un conector
const Cableado = () => (
  <svg {...common} className="svc-ico ico-cab">
    <path className="w w1" d="M4 14c10 0 10 10 20 10h8" />
    <path className="w w2" d="M4 24h28" />
    <path className="w w3" d="M4 34c10 0 10-10 20-10h8" />
    <rect x="32" y="17" width="11" height="14" rx="2" />
    <path d="M35 21v6M38 21v6" />
  </svg>
);

// Escudo con una línea de escaneo
const Seguridad = () => (
  <svg {...common} className="svc-ico ico-sec">
    <defs>
      <clipPath id="ico-sec-clip">
        <path d="M24 5 9 11v11c0 9.5 6.4 17.4 15 20 8.6-2.6 15-10.5 15-20V11L24 5Z" />
      </clipPath>
    </defs>
    <path d="M24 5 9 11v11c0 9.5 6.4 17.4 15 20 8.6-2.6 15-10.5 15-20V11L24 5Z" />
    <path d="m17.5 23.5 4.5 4.5 8.5-9" />
    <g clipPath="url(#ico-sec-clip)">
      <rect className="scan" x="6" y="4" width="36" height="2.4" fill="currentColor" stroke="none" />
    </g>
  </svg>
);

// Engranajes que giran en sentidos opuestos
const gear = (r: number, teeth: number) => {
  const pts: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const a = (Math.PI * i) / teeth;
    const rr = i % 2 === 0 ? r : r * 0.78;
    pts.push(`${(Math.cos(a) * rr).toFixed(2)},${(Math.sin(a) * rr).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
};
const Mantenimiento = () => (
  <svg {...common} className="svc-ico ico-gear">
    <g transform="translate(19 21)">
      <g className="g1">
        <path d={gear(13, 8)} />
        <circle r="4.5" />
      </g>
    </g>
    <g transform="translate(36 36)">
      <g className="g2">
        <path d={gear(8, 6)} />
        <circle r="2.6" />
      </g>
    </g>
  </svg>
);

// Auriculares con ondas de atención
const Soporte = () => (
  <svg {...common} className="svc-ico ico-sup">
    <path d="M10 27v-4a14 14 0 0 1 28 0v4" />
    <rect x="7" y="26" width="7" height="11" rx="2.5" />
    <rect x="34" y="26" width="7" height="11" rx="2.5" />
    <path d="M37.5 37c0 4-4 6-9 6h-3" />
    <path className="wave w1" d="M20 21a5 5 0 0 1 8 0" />
    <path className="wave w2" d="M17 17a10 10 0 0 1 14 0" />
  </svg>
);

export const SERVICE_ICONS: Record<string, ComponentType> = {
  virtualizacion: Virtualizacion,
  "windows-server": WindowsServer,
  almacenamiento: Almacenamiento,
  redes: Redes,
  cableado: Cableado,
  seguridad: Seguridad,
  mantenimiento: Mantenimiento,
  soporte: Soporte,
};
