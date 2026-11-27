import { CSSProperties, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CheckIcon from "@mui/icons-material/Check";
import RadarIcon from "@mui/icons-material/Radar";
import BlockIcon from "@mui/icons-material/Block";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUserOutlined";
import ShieldIcon from "@mui/icons-material/ShieldOutlined";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import HubIcon from "@mui/icons-material/HubOutlined";
import PsychologyIcon from "@mui/icons-material/PsychologyOutlined";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import LockIcon from "@mui/icons-material/LockOutlined";
import BugReportIcon from "@mui/icons-material/BugReportOutlined";
import PhishingIcon from "@mui/icons-material/Phishing";
import LanIcon from "@mui/icons-material/LanOutlined";
import GppMaybeIcon from "@mui/icons-material/GppMaybeOutlined";
import ComputerIcon from "@mui/icons-material/ComputerOutlined";
import DnsIcon from "@mui/icons-material/DnsOutlined";
import SmartphoneIcon from "@mui/icons-material/SmartphoneOutlined";
import FolderSharedIcon from "@mui/icons-material/FolderSharedOutlined";
import kasperskyImg from "@assets/kasperky-parnet.jpg";
import { useLanguage } from "../i18n/LanguageContext";
import { AssetId, partnerContent, SolutionId, ThreatId } from "../i18n/partnerContent";
import { CONTACT } from "../data/contact";
import { NeuralBackground } from "../Components/NeuralBackground/NeuralBackground";
import { ProtectionCenter, RadarShield, useInView } from "../Components/Partner/PartnerVisuals";
import "../Components/Partner/Partner.css";

// Módulo PARTNER: presentación comercial de las soluciones Kaspersky con estética de centro de operaciones de seguridad.

const SOLUTION_ICON: Record<SolutionId, typeof ShieldIcon> = {
  foundations: ShieldIcon,
  "edr-optimum": TroubleshootIcon,
  "xdr-optimum": HubIcon,
  "xdr-expert": PsychologyIcon,
  "security-center": DashboardIcon,
};
const THREAT_ICON: Record<ThreatId, typeof ShieldIcon> = {
  ransomware: LockIcon,
  malware: BugReportIcon,
  phishing: PhishingIcon,
  network: LanIcon,
  apt: GppMaybeIcon,
};
const ASSET_ICON: Record<AssetId, typeof ShieldIcon> = {
  workstations: ComputerIcon,
  servers: DnsIcon,
  mobile: SmartphoneIcon,
  data: FolderSharedIcon,
};
const STEP_ICON = [RadarIcon, BlockIcon, VerifiedUserIcon];

const KP_PALETTE = { primary: "#ff3b4e", secondary: "#19d3b0", node: "#7fd8c8" };

/* Sección con aparición al entrar en pantalla */
const Section = ({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) => {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section ref={ref} id={id} className={`kp-section ${className}${inView ? " is-in" : ""}`}>
      {children}
    </section>
  );
};

const Head = ({ title, lead }: { title: string; lead?: string }) => (
  <div className="kp-head kp-reveal">
    <h2>{title}</h2>
    {lead && <p>{lead}</p>}
  </div>
);

export const Partners = () => {
  const { lang } = useLanguage();
  const c = partnerContent[lang];
  const [solution, setSolution] = useState<SolutionId>("foundations");
  const [scanKey, setScanKey] = useState<Record<string, number>>({});
  const rescan = (id: string) => setScanKey((k) => ({ ...k, [id]: (k[id] ?? 0) + 1 }));

  return (
    <main id="contenido" className="page kp">
      {/* A. HERO */}
      <section className="kp-hero">
        <NeuralBackground className="kp-hero__net" palette={KP_PALETTE} />
        <div className="kp-hero__glow" aria-hidden="true" />
        <div className="wrap kp-hero__grid">
          <div className="kp-hero__copy">
            <span className="kp-chip kp-chip--ok kp-hero__badge">
              <ShieldIcon fontSize="inherit" />
              {c.hero.badge}
            </span>
            <h1>{c.hero.title}</h1>
            <p className="kp-hero__lead">{c.hero.lead}</p>
            <div className="kp-actions">
              <Link to="/contactanos" className="kp-btn kp-btn--primary">
                {c.hero.primary}
                <ArrowForwardIcon fontSize="small" />
              </Link>
              <a href="#soluciones" className="kp-btn kp-btn--ghost">
                {c.hero.secondary}
              </a>
            </div>
          </div>
          <RadarShield c={c.hero} />
        </div>
      </section>

      {/* B. PROTECCIÓN INTELIGENTE */}
      <Section className="kp-flow-section">
        <div className="wrap">
          <Head title={c.flow.title} lead={c.flow.lead} />
          <div className="kp-flow">
            <div className="kp-flow__rail" aria-hidden="true">
              <span className="kp-flow__packet" />
            </div>
            <ol className="kp-flow__steps">
              {c.flow.steps.map((s, i) => {
                const Icon = STEP_ICON[i];
                return (
                  <li key={s.title} className="kp-card kp-reveal" style={{ "--i": i } as CSSProperties}>
                    <span className={`kp-flow__icon step-${i}`}>
                      <Icon />
                    </span>
                    <span className="kp-flow__num">{i + 1}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Section>

      {/* C. SOLUCIONES */}
      <Section id="soluciones">
        <div className="wrap">
          <Head title={c.solutions.title} lead={c.solutions.lead} />
          <div className="kp-solutions" role="tablist" aria-orientation="horizontal">
            {c.solutions.items.map((s, i) => {
              const Icon = SOLUTION_ICON[s.id];
              const on = s.id === solution;
              return (
                <article
                  key={s.id}
                  className={`kp-sol kp-reveal${on ? " is-open" : ""}`}
                  style={{ "--i": i } as CSSProperties}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-expanded={on}
                    className="kp-sol__toggle"
                    onClick={() => setSolution(s.id)}
                  >
                    <span className="kp-sol__icon">
                      <Icon />
                    </span>
                    <span className="kp-sol__tier">{s.tier}</span>
                    <span className="kp-sol__name">{s.name}</span>
                    {!on && <span className="kp-sol__more">{c.solutions.select}</span>}
                  </button>
                  {on && (
                    <div className="kp-sol__body">
                      <p className="kp-sol__tagline">{s.tagline}</p>
                      <dl className="kp-sol__pcb">
                        <div className="is-problem">
                          <dt>{c.solutions.problem}</dt>
                          <dd>{s.problem}</dd>
                        </div>
                        <div>
                          <dt>{c.solutions.how}</dt>
                          <dd>{s.how}</dd>
                        </div>
                        <div className="is-benefit">
                          <dt>{c.solutions.benefit}</dt>
                          <dd>{s.benefit}</dd>
                        </div>
                      </dl>
                      <ul className="kp-sol__features" aria-label={c.solutions.features}>
                        {s.features.map((f, k) => (
                          <li key={f} style={{ "--k": k } as CSSProperties}>
                            <CheckIcon fontSize="inherit" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link to="/contactanos" className="kp-btn kp-btn--primary kp-btn--sm">
                        {c.cta.primary}
                        <ArrowForwardIcon fontSize="small" />
                      </Link>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      {/* D. AMENAZAS */}
      <Section className="kp-threats-section">
        <div className="wrap">
          <Head title={c.threats.title} lead={c.threats.lead} />
          <ul className="kp-threats">
            {c.threats.items.map((t, i) => {
              const Icon = THREAT_ICON[t.id];
              return (
                <li
                  key={t.id}
                  className="kp-threat kp-card kp-reveal"
                  style={{ "--i": i } as CSSProperties}
                  onPointerEnter={(e) => e.pointerType === "mouse" && rescan(t.id)}
                  onClick={() => rescan(t.id)}
                >
                  <div key={scanKey[t.id] ?? 0} className="kp-threat__scan-wrap">
                    <span className="kp-threat__scan" aria-hidden="true" />
                    <span className="kp-threat__icon">
                      <Icon />
                    </span>
                    <span className="kp-threat__status">
                      <span className="is-detected">{c.threats.detected}</span>
                      <span className="is-blocked">
                        <CheckIcon fontSize="inherit" /> {c.threats.blocked}
                      </span>
                    </span>
                  </div>
                  <h3>{t.name}</h3>
                  <p>{t.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* E. SEGURIDAD EMPRESARIAL */}
      <Section>
        <div className="wrap">
          <Head title={c.assets.title} lead={c.assets.lead} />
          <div className="kp-assets">
            {c.assets.items.map((a, i) => {
              const Icon = ASSET_ICON[a.id];
              return (
                <article key={a.id} className="kp-asset kp-card kp-reveal" style={{ "--i": i } as CSSProperties}>
                  <div className="kp-asset__meter">
                    <svg viewBox="0 0 100 100" aria-hidden="true">
                      <circle cx="50" cy="50" r="44" className="kp-asset__track" />
                      <circle cx="50" cy="50" r="44" className="kp-asset__fill" />
                    </svg>
                    <Icon />
                  </div>
                  <span className="kp-chip kp-chip--ok">
                    <span className="kp-led" aria-hidden="true" />
                    {c.assets.active}
                  </span>
                  <h3>{a.name}</h3>
                  <p>{a.text}</p>
                  <ul className="kp-tags">
                    {a.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      {/* F. CENTRO DE PROTECCIÓN */}
      <Section className="kp-center-section">
        <div className="wrap">
          <Head title={c.center.title} lead={c.center.lead} />
          <div className="kp-reveal">
            <ProtectionCenter c={c.center} />
          </div>
        </div>
      </Section>

      {/* G. LLAMADO A LA ACCIÓN */}
      <Section className="kp-cta-section">
        <div className="wrap">
          <div className="kp-cta kp-reveal">
            <img src={kasperskyImg} alt="" className="kp-cta__img" loading="lazy" />
            <div className="kp-cta__content">
              <h2>{c.cta.title}</h2>
              <p>{c.cta.text}</p>
              <div className="kp-actions">
                <Link to="/contactanos" className="kp-btn kp-btn--primary">
                  {c.cta.primary}
                  <ArrowForwardIcon fontSize="small" />
                </Link>
                <a className="kp-btn kp-btn--ghost" href={CONTACT.whatsappUrl(c.cta.whatsapp)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon fontSize="small" />
                  {c.cta.secondary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};
