import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import PlaceIcon from "@mui/icons-material/PlaceOutlined";
import { useLanguage } from "../i18n/LanguageContext";
import { ContactForm } from "../Components/ContactForm/ContactForm";
import { CONTACT } from "../data/contact";
import "./Pages.css";

export const Contactanos = () => {
  const { t } = useLanguage();
  const c = t.contactPage;

  return (
    <main id="contenido" className="page">
      <header className="page-head">
        <div className="wrap">
          <h1>{c.title}</h1>
          <p className="lead">{c.lead}</p>
        </div>
      </header>

      <section className="section wrap contact-page">
        <div>
          <h2 className="contact-page__title">{t.form.title}</h2>
          <ContactForm />
        </div>
        <aside className="channels" aria-labelledby="canales">
          <h2 id="canales">{c.channels}</h2>
          <a href={CONTACT.whatsappUrl(t.whatsapp.message)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <span>
              <small>{c.whatsapp}</small>
              {CONTACT.phoneDisplay}
            </span>
          </a>
          <a href={`tel:${CONTACT.phoneE164}`}>
            <PhoneIcon />
            <span>
              <small>{c.phone}</small>
              {CONTACT.phoneDisplay}
            </span>
          </a>
          <div>
            <PlaceIcon />
            <span>
              <small>{c.location}</small>
              {c.locationValue}
            </span>
          </div>
        </aside>
      </section>
    </main>
  );
};
