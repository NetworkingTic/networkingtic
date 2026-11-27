import { Link } from "react-router-dom";
import kasperskyImg from "@assets/kasperky-parnet.jpg";
import { useLanguage } from "../i18n/LanguageContext";
import { Topology } from "../Components/Topology/Topology";
import { ServiceIndex } from "../Components/ServiceIndex/ServiceIndex";
import { ContactForm } from "../Components/ContactForm/ContactForm";
import "./Pages.css";

export const Home = () => {
  const { t } = useLanguage();

  return (
    <main id="contenido" className="page">
      <section className="hero wrap">
        <div className="hero__copy">
          <h1>{t.hero.title}</h1>
          <p className="lead">{t.hero.lead}</p>
          <div className="hero__actions">
            <Link to="/contactanos" className="btn btn-primary">
              {t.hero.primary}
            </Link>
            <a href="#servicios" className="btn btn-ghost">
              {t.hero.secondary}
            </a>
          </div>
        </div>
        <Topology />
      </section>

      <section className="facts" aria-label="NetWorking TIC">
        <ul className="wrap facts__list">
          {t.facts.map((f) => (
            <li key={f.title}>
              <strong>{f.title}</strong>
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="servicios" className="section wrap">
        <div className="section-head">
          <h2>{t.servicesSection.title}</h2>
          <p className="lead">{t.servicesSection.lead}</p>
        </div>
        <ServiceIndex />
        <p className="section-foot">
          <Link to="/servicios" className="text-link">
            {t.servicesSection.all}
          </Link>
        </p>
      </section>

      <section className="section process-section">
        <div className="wrap">
          <div className="section-head">
            <h2>{t.process.title}</h2>
            <p className="lead">{t.process.lead}</p>
          </div>
          <ol className="process">
            {t.process.steps.map((s, i) => (
              <li key={s.title}>
                <span className="process__num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band">
        <div className="wrap partner-band">
          <img src={kasperskyImg} alt="Kaspersky" loading="lazy" width={160} height={160} />
          <div>
            <h2>{t.partnerBand.title}</h2>
            <p className="lead">{t.partnerBand.text}</p>
          </div>
          <Link to="/partners" className="btn btn-light">
            {t.partnerBand.cta}
          </Link>
        </div>
      </section>

      <section className="section wrap contact-split">
        <div className="section-head">
          <h2>{t.contactBand.title}</h2>
          <p className="lead">{t.contactBand.text}</p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
};
