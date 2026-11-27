import { useEffect, useState } from "react";
import PublicIcon from "@mui/icons-material/PublicOutlined";
import SecurityIcon from "@mui/icons-material/ShieldOutlined";
import HubIcon from "@mui/icons-material/HubOutlined";
import DnsIcon from "@mui/icons-material/DnsOutlined";
import StorageIcon from "@mui/icons-material/StorageOutlined";
import ComputerIcon from "@mui/icons-material/ComputerOutlined";
import { useLanguage } from "../../i18n/LanguageContext";
import { Dictionary } from "../../i18n/translations";
import "./Topology.css";

// Diagrama de red del inicio: Internet → Firewall → Red principal → Servidores / Almacenamiento / Equipos.
// Los "paquetes" recorren los enlaces; si el visitante pidió reducir movimiento, no se animan.

const W = 160;
const H = 48;

type NodeDef = { key: keyof Dictionary["hero"]["nodes"]; x: number; y: number; Icon: typeof PublicIcon; core?: boolean };

const NODES: NodeDef[] = [
  { key: "internet", x: 260, y: 44, Icon: PublicIcon },
  { key: "firewall", x: 260, y: 136, Icon: SecurityIcon },
  { key: "core", x: 260, y: 228, Icon: HubIcon, core: true },
  { key: "servers", x: 85, y: 356, Icon: DnsIcon },
  { key: "storage", x: 260, y: 356, Icon: StorageIcon },
  { key: "users", x: 435, y: 356, Icon: ComputerIcon },
];

const ROUTES = [
  "M260 44 V228 V292 H85 V356",
  "M260 44 V356",
  "M260 44 V228 V292 H435 V356",
];

export const Topology = () => {
  const { t } = useLanguage();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setAnimate(!mq?.matches);
  }, []);

  return (
    <figure className="topology" aria-label={t.hero.status}>
      <figcaption className="topology__status">
        <span className="pulse-dot" aria-hidden="true" />
        {t.hero.status}
      </figcaption>
      <svg viewBox="0 0 520 400" role="img" aria-hidden="true">
        {ROUTES.map((d) => (
          <path key={d} d={d} className="topology__link" />
        ))}

        {animate &&
          ROUTES.map((d, i) =>
            [0, 1].map((k) => (
              <circle key={`${i}-${k}`} r="4" className="topology__packet">
                <animateMotion dur="3.6s" repeatCount="indefinite" begin={`${i * 0.55 + k * 1.8}s`} path={d} />
              </circle>
            ))
          )}

        {NODES.map(({ key, x, y, Icon, core }) => (
          <foreignObject key={key} x={x - W / 2} y={y - H / 2} width={W} height={H}>
            <div className={`topology__node${core ? " is-core" : ""}`}>
              <Icon fontSize="small" />
              <span>{t.hero.nodes[key]}</span>
              <i className="topology__led" />
            </div>
          </foreignObject>
        ))}
      </svg>
    </figure>
  );
};
