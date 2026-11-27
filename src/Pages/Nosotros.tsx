import visionImg from "@assets/vision-mision.jpg";
import { useLanguage } from "../i18n/LanguageContext";
import "./Pages.css";

export const Nosotros = () => {
  const { t } = useLanguage();
  const a = t.aboutPage;

  return (
    <main id="contenido" className="page">
      <header className="page-head">
        <div className="wrap">
          <h1>{a.title}</h1>
          <p className="lead">{a.lead}</p>
        </div>
      </header>

      <section className="section wrap mission">
        <img src={visionImg} alt="" loading="lazy" />
        <div className="mission__text">
          <div>
            <h2>{a.missionTitle}</h2>
            <p>{a.mission}</p>
          </div>
          <div>
            <h2>{a.visionTitle}</h2>
            <p>{a.vision}</p>
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="wrap">
          <div className="section-head">
            <h2>{a.valuesTitle}</h2>
          </div>
          <dl className="feature-grid">
            {a.values.map((v) => (
              <div key={v.title}>
                <dt>{v.title}</dt>
                <dd>{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
};
