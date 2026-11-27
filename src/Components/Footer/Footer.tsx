import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { TikTokIcon } from "../IconsCustom/TikTokIcon";
import { Brand } from "../Brand/Brand";
import { NeuralBackground } from "../NeuralBackground/NeuralBackground";
import { useLanguage } from "../../i18n/LanguageContext";
import { CONTACT } from "../../data/contact";
import "./Footer.css";

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <NeuralBackground />
      <div className="site-footer__veil" aria-hidden="true" />
      <div className="wrap site-footer__grid">
        <div className="site-footer__brand">
          <Brand />
          <p>{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.footer.sitemap}>
          <h2>{t.footer.sitemap}</h2>
          <Link to="/">{t.nav.home}</Link>
          <Link to="/servicios">{t.nav.services}</Link>
          <Link to="/partners">{t.nav.partners}</Link>
          <Link to="/conocenos">{t.nav.about}</Link>
          <Link to="/contactanos">{t.nav.contact}</Link>
        </nav>

        <div>
          <h2>{t.footer.contact}</h2>
          <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>
          <a href={CONTACT.whatsappUrl(t.whatsapp.message)} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <span>{t.contactPage.locationValue}</span>
        </div>

        <div>
          <h2>{t.footer.social}</h2>
          <div className="site-footer__social">
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <TikTokIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="wrap site-footer__legal">
        © {new Date().getFullYear()} NETWORKING TIC S.A.S. {t.footer.rights}
      </div>
    </footer>
  );
};

export const WhatsAppButton = () => {
  const { t } = useLanguage();
  return (
    <a
      className="whatsapp-fab"
      href={CONTACT.whatsappUrl(t.whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.label}
      title={t.whatsapp.label}
    >
      <WhatsAppIcon />
    </a>
  );
};
