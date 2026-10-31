import principal from "@assets/services.webp";
import { cardsData } from "../../mocks/CardMock";
import { ContactForm } from "../../Components/ContactForm/ContactForm";
import "./Home.css";
import { Carousel } from "../../Components/Carousel/Carousel";

export const Home: React.FC = () => {
  return (
    <main>
      <article>
        <section className="section-principal container">
          <img
            src={principal}
            alt="imagen servicios IT"
            className="slide-fwd-right"
          />
          <section className="text-focus-in">
            <h1>NETWORKING TIC</h1>
            <p>
              Automatización, Seguridad y Soporte 24/7 Conéctate con la
              innovación y descubre cómo podemos hacer que tu infraestructura
              funcione de manera eficiente, segura y con total flexibilidad.
              ¡Contáctanos y comienza a innovar hoy mismo!
            </p>
          </section>
        </section>
        <hr />
        <Carousel items={cardsData} />
        <section>
          <ContactForm />
        </section>
      </article>
    </main>
  );
};
