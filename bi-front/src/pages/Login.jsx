import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo/logo";
import Button from "../components/Button/Button";
import styles from "../styles/login.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, alerta, isLoading, isAuthenticated, cleanUpAlerta } =
    useContext(AuthContext);

  useEffect(() => {
    isAuthenticated && navigate("/ong", { replace: true });

    function handleEnter(e) {
      if (e.key === "Enter") {
        handleSubmit();
      }
    }

    document.addEventListener("keypress", handleEnter);
    return () => {
      document.removeEventListener("keypress", handleEnter);
      cleanUpAlerta();
    };
  }, [isAuthenticated]);

  function handleSubmit() {
    login(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <div className={styles.login}>
      <Link to={"/"}>
        <img src="./BoraImpactar.png" alt="BoraImpactarLogo" />
      </Link>
      <div className={styles.loginTab}>
        <h2>Entrar como ONG</h2>
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {alerta !== "" && <p>{alerta}</p>}
        </div>
        <div className={styles.inputField}>
          <Button
            customClass={styles.customClass1}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Entrar
          </Button>
          <a href="">Esqueceu a senha?</a>
        </div>
        <div className={styles.buttonField}>
          <h3>Não possui a conta?</h3>
          <Button customClass={styles.customClass2}>Criar Conta</Button>
        </div>
      </div>
      <Logo />
    </div>
  );
}
