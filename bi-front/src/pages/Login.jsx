import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "../components/Logo/logo";
import Button from "../components/Button/Button";
import styles from "../styles/login.module.css";
import { useEffect, useState } from "react";
import { useLogin, useUserData } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/ong/home/solicitacoes"; // Redireciona para a página principal se não vier de uma rota protegida

  const { data } = useUserData();
  const { mutate: login, isPending, isError, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    data && navigate(from, { replace: true });

    function handleEnter(e) {
      if (e.key === "Enter") {
        handleSubmit();
      }
    }

    document.addEventListener("keypress", handleEnter);
    return () => {
      document.removeEventListener("keypress", handleEnter);
    };
  }, [data]);

  useEffect(() => {
    if (isError === true) {
      error.response.status === 401
        ? toast.error("Email ou senha incorretos.")
        : toast.error("Erro ao tentar fazer login.");
    }
  }, [isError, error]);

  function handleSubmit() {
    if (email === "" || password === "") {
      return toast.error("Preencha os campos corretamente.");
    }
    if (!email.includes("@") || !email.includes(".")) {
      return toast.error("Por favor, insira um email válido.");
    }
    login({ email: email, password: password });
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
            disabled={isPending}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />
        </div>
        <div className={styles.inputField}>
          <Button
            customClass={styles.customClass1}
            onClick={handleSubmit}
            disabled={isPending}
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
