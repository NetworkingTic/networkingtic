import { Link } from "react-router-dom";
import logoOjo from "@assets/logo-ojo.webp";
import "./Brand.css";

// Logo de la empresa: el ojo (imagen) + el nombre escrito con la tipografía del logo (Oswald).
export const Brand = ({ onClick }: { onClick?: () => void }) => (
  <Link to="/" className="brand" aria-label="NetWorking TIC" onClick={onClick}>
    <img src={logoOjo} alt="" width={60} height={37} />
    <span className="brand__word" aria-hidden="true">
      <span className="brand__name">NETWORKING</span>
      <span className="brand__tic">TIC</span>
    </span>
  </Link>
);
