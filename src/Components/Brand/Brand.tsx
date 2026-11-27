import { Link } from "react-router-dom";
import logo from "@assets/logo-networking-tic.webp";
import "./Brand.css";

// Logo oficial de la empresa, tal como la imagen original: ojo arriba y nombre debajo.
// Solo se le quitó el fondo blanco para que se integre con el fondo de la página.
export const Brand = ({ onClick }: { onClick?: () => void }) => (
  <Link to="/" className="brand" onClick={onClick}>
    <img src={logo} alt="NetWorking TIC" width={308} height={269} />
  </Link>
);
