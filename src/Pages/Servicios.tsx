import { useLanguage } from "../i18n/LanguageContext";
import { ServiceExplorer } from "../Components/ServiceExplorer/ServiceExplorer";
import "./Pages.css";

// Página Servicios: encabezado + explorador interactivo con los 8 servicios
// (los textos, fotos y listas vienen de src/data/services.ts).
export const Servicios = () => {
  const { t } = useLanguage();

  return (
    <main id="contenido" className="page">
      <header className="page-head svx-head">
        <div className="wrap">
          <h1>{t.servicesPage.title}</h1>
          <p className="lead">{t.servicesPage.lead}</p>
        </div>
      </header>

      <section className="wrap" aria-label={t.servicesPage.title}>
        <ServiceExplorer />
      </section>
    </main>
  );
};
