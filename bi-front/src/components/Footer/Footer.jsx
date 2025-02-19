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
            <li>Home</li>
            <li>Sou Ong</li>
            <li>Sou Voluntário</li>
            <li>Conecta Recife</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
