import { CSSProperties, useEffect, useRef, useState } from "react";
import ComputerIcon from "@mui/icons-material/ComputerOutlined";
import DnsIcon from "@mui/icons-material/DnsOutlined";
import SmartphoneIcon from "@mui/icons-material/SmartphoneOutlined";
import CloudIcon from "@mui/icons-material/CloudOutlined";
import MailIcon from "@mui/icons-material/MailOutline";
import RouterIcon from "@mui/icons-material/RouterOutlined";
import ShieldIcon from "@mui/icons-material/ShieldOutlined";
import { NodeId, PartnerContent } from "../../i18n/partnerContent";

/* ---------- Aparición al entrar en pantalla (una sola vez) ---------- */
export const useInView = <T extends HTMLElement>(threshold = 0.18) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
};

/* ==========================================================
   Radar con escudo (encabezado)
   Amenazas (rojo) llegan desde todas las direcciones; al tocar el perímetro
   del escudo se neutralizan (destello verde azulado) y el contador suma.
   ========================================================== */
const THREATS = [
  { a: 18, d: 3.6, delay: 0 },
  { a: 72, d: 4.4, delay: 1.1 },
  { a: 131, d: 3.9, delay: 0.5 },
  { a: 188, d: 4.8, delay: 2.0 },
  { a: 236, d: 3.4, delay: 1.5 },
  { a: 289, d: 4.1, delay: 0.8 },
  { a: 330, d: 4.6, delay: 2.6 },
];

export const RadarShield = ({ c }: { c: PartnerContent["hero"] }) => {
  const [blocked, setBlocked] = useState(0);
  return (
    <figure className="kp-radar" aria-label={c.radarTitle}>
      <svg viewBox="-200 -200 400 400" aria-hidden="true">
        <defs>
          <radialGradient id="kp-core" r="0.5">
            <stop offset="0%" stopColor="#19d3b0" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#00a88e" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#00a88e" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="kp-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#19d3b0" stopOpacity="0" />
            <stop offset="100%" stopColor="#19d3b0" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        <circle r="190" fill="url(#kp-core)" />
        {/* anillos y retícula */}
        <g className="kp-radar__grid">
          <circle r="76" />
          <circle r="128" />
          <circle r="178" className="kp-radar__outer" />
          <path d="M-185 0H185M0-185V185" />
        </g>

        {/* barrido del radar */}
        <g className="kp-radar__sweep">
          <path d="M0 0 L178 0 A178 178 0 0 0 136.4 -114.4 Z" fill="url(#kp-sweep)" />
          <line x1="0" y1="0" x2="178" y2="0" />
        </g>

        {/* amenazas entrantes */}
        {THREATS.map((t, i) => (
          <g key={i} transform={`rotate(${t.a})`}>
            <circle
              className="kp-radar__threat"
              r="5"
              style={{ "--d": `${t.d}s`, "--delay": `${t.delay}s` } as CSSProperties}
              onAnimationIteration={() => setBlocked((n) => n + 1)}
            />
            <circle className="kp-radar__burst" r="7" style={{ "--d": `${t.d}s`, "--delay": `${t.delay}s` } as CSSProperties} />
          </g>
        ))}

        {/* escudo central */}
        <g className="kp-radar__shield">
          <circle r="62" className="kp-radar__halo" />
          <path d="M0 -46 L36 -32 V2 C36 26 20 40 0 48 C-20 40 -36 26 -36 2 V-32 Z" />
          <path d="M-14 1 L-3 12 L16 -10" className="kp-radar__check" />
        </g>
      </svg>

      <figcaption className="kp-radar__panel">
        <span className="kp-led" aria-hidden="true" />
        <span>
          <strong>{c.status}</strong>
          <span className="kp-radar__count">
            <b>{blocked}</b> {c.blocked}
          </span>
        </span>
        <small>{c.simulation}</small>
      </figcaption>
    </figure>
  );
};

/* ==========================================================
   Centro de protección interactivo
   Consola central conectada a 6 componentes; se elige uno con clic o toque.
   Mientras nadie interactúa, recorre los componentes solo.
   ========================================================== */
const NODE_POS: Record<NodeId, { x: number; y: number }> = {
  endpoints: { x: 90, y: 90 },
  servers: { x: 300, y: 40 },
  mobile: { x: 510, y: 90 },
  cloud: { x: 510, y: 330 },
  mail: { x: 300, y: 380 },
  network: { x: 90, y: 330 },
};
const NODE_ICON: Record<NodeId, typeof ComputerIcon> = {
  endpoints: ComputerIcon,
  servers: DnsIcon,
  mobile: SmartphoneIcon,
  cloud: CloudIcon,
  mail: MailIcon,
  network: RouterIcon,
};

export const ProtectionCenter = ({ c }: { c: PartnerContent["center"] }) => {
  const [active, setActive] = useState<NodeId>("endpoints");
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const ids = c.nodes.map((n) => n.id);
    const t = window.setInterval(() => {
      setActive((cur) => ids[(ids.indexOf(cur) + 1) % ids.length]);
    }, 3200);
    return () => window.clearInterval(t);
  }, [auto, c.nodes]);

  const current = c.nodes.find((n) => n.id === active)!;
  const pick = (id: NodeId) => {
    setAuto(false);
    setActive(id);
  };

  return (
    <div className="kp-center">
      <div className="kp-center__map">
        <svg viewBox="0 0 600 420" preserveAspectRatio="none" aria-hidden="true">
          {c.nodes.map((n) => {
            const p = NODE_POS[n.id];
            const d = `M300 210 L${p.x} ${p.y}`;
            return (
              <g key={n.id} className={n.id === active ? "is-active" : undefined}>
                <path d={d} className="kp-center__link" />
                <path d={d} className="kp-center__flow" />
                <circle r="3.5" className="kp-center__packet">
                  <animateMotion dur={n.id === active ? "1.4s" : "2.8s"} repeatCount="indefinite" path={`M${p.x} ${p.y} L300 210`} />
                </circle>
              </g>
            );
          })}
        </svg>

        <div className="kp-center__console" style={{ left: "50%", top: "50%" }}>
          <ShieldIcon />
          <span>{c.console}</span>
        </div>

        {c.nodes.map((n) => {
          const p = NODE_POS[n.id];
          const Icon = NODE_ICON[n.id];
          return (
            <button
              key={n.id}
              type="button"
              className={`kp-center__node${n.id === active ? " is-active" : ""}`}
              style={{ left: `${(p.x / 600) * 100}%`, top: `${(p.y / 420) * 100}%` }}
              onClick={() => pick(n.id)}
              aria-pressed={n.id === active}
            >
              <Icon />
              <span>{n.name}</span>
            </button>
          );
        })}
      </div>

      <div className="kp-center__detail" aria-live="polite">
        <div key={current.id} className="kp-center__detail-inner">
          <span className="kp-chip kp-chip--ok">
            <span className="kp-led" aria-hidden="true" />
            {c.status}
          </span>
          <h3>{current.name}</h3>
          <p>{current.text}</p>
          <div className="kp-center__dots" role="group" aria-label={c.hint}>
            {c.nodes.map((n) => (
              <button
                key={n.id}
                type="button"
                className={n.id === active ? "is-on" : undefined}
                aria-label={n.name}
                onClick={() => pick(n.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
