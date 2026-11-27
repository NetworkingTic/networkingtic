import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { serviceGroups, services } from "../data/services";
import { useLanguage } from "../i18n/LanguageContext";
import "./Pages.css";

export const Servicios = () => {
  const { t, lang } = useLanguage();

  return (
    <main id="contenido" className="page">
      <header className="page-head">
        <div className="wrap">
          <h1>{t.servicesPage.title}</h1>
          <p className="lead">{t.servicesPage.lead}</p>
          <nav className="jump-nav" aria-label={t.servicesPage.title}>
            {services.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.text[lang].name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {serviceGroups.map((group) => (
        <section key={group} className="wrap service-group">
          <h2 className="service-group__title">{t.servicesSection.groups[group]}</h2>
          {services
            .filter((s) => s.group === group)
            .map((s) => {
              const tx = s.text[lang];
              return (
                <article key={s.id} id={s.id} className="service-detail">
                  <img src={s.image} alt="" loading="lazy" />
                  <div className="service-detail__body">
                    <h3>{tx.name}</h3>
                    <p className="service-detail__summary">{tx.summary}</p>
                    <p>{tx.description}</p>
                    <h4>{t.servicesPage.includes}</h4>
                    <ul className="checklist">
                      {tx.includes.map((item) => (
                        <li key={item}>
                          <CheckIcon fontSize="small" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contactanos" className="text-link">
                      {t.servicesPage.cta}
                    </Link>
                  </div>
                </article>
              );
            })}
        </section>
      ))}
    </main>
  );
};
