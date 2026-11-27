import { Link } from "react-router-dom";
import { serviceGroups, services } from "../../data/services";
import { useLanguage } from "../../i18n/LanguageContext";
import "./ServiceIndex.css";

// Servicios agrupados en tres columnas; cada fila lleva al detalle en /servicios.
export const ServiceIndex = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="service-index">
      {serviceGroups.map((group) => {
        const items = services.filter((s) => s.group === group);
        return (
          <section key={group} className="service-index__group" aria-labelledby={`grp-${group}`}>
            <h3 id={`grp-${group}`}>{t.servicesSection.groups[group]}</h3>
            <ul>
              {items.map((s) => (
                <li key={s.id}>
                  <Link to={`/servicios#${s.id}`} className="service-row">
                    <span className="service-row__name">{s.text[lang].name}</span>
                    <span className="service-row__summary">{s.text[lang].summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
};
