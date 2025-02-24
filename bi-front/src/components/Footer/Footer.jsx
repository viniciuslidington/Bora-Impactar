import { Link } from "react-router-dom";
import Logo from "../Logo/logo";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.container}>
          <Logo />
          <h3>Bora Impactar!</h3>
          <p>A união que transforma vidas</p>
        </div>
        <div className={styles.container}>
          <h3>Links Rápidos</h3>
          <ul>
            <Link to={"/"}>
              <li>MainPage</li>
            </Link>
            <Link to={"/voluntario/home"}>
              <li>Sou Voluntário</li>
            </Link>
            <Link to={"/login"}>
              <li>Sou ONG</li>
            </Link>
            <a href="https://conecta.recife.pe.gov.br/" target="blank">
              <li>Conecta Recife</li>
            </a>
          </ul>
        </div>
      </div>
    </footer>
  );
}
