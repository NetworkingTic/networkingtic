import { Link } from "react-router-dom";
import kasperskyImg from "@assets/kasperky-parnet.jpg";
import { useLanguage } from "../i18n/LanguageContext";
import "./Pages.css";

export const Partners = () => {
  const { t } = useLanguage();
  const p = t.partnersPage;

  return (
    <main id="contenido" className="page">
      <header className="page-head">
        <div className="wrap page-head--split">
          <div>
            <h1>{p.title}</h1>
            <p className="lead">{p.lead}</p>
          </div>
          <img src={kasperskyImg} alt="Kaspersky" className="page-head__img" />
        </div>
      </header>

      <section className="section wrap">
        <div className="section-head">
          <h2>{p.benefitsTitle}</h2>
        </div>
        <dl className="feature-grid">
          {p.benefits.map((b) => (
            <div key={b.title}>
              <dt>{b.title}</dt>
              <dd>{b.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="band">
        <div className="wrap cta-band">
          <p>{p.closing}</p>
          <Link to="/contactanos" className="btn btn-light">
            {p.cta}
          </Link>
        </div>
      </section>
    </main>
  );
};
