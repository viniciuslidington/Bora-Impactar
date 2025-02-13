import { Link } from "react-router-dom";
import Logo from "../components/Logo/logo";
import Button from "../components/Button/Button";
import styles from "../styles/login.module.css";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alerta, setAlerta] = useState("");

  async function handleEntrar() {
    if (email === "" || senha === "") {
      setAlerta("Preencha os campos corretamente!");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setAlerta("Por favor, insira um email válido.");
      return;
    }

    try {
      setIsLoading(true);
      const loginData = { email: email, password: senha };
      console.log(loginData);
      // Faz a requisição POST para a API
      // Mexe aqui vini, lembra de botar await na requisição :)
      const response = await fetch("rota da requisição", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      // Converte a reposta em JSON
      const data = await response.json();
      // Ver resposta no log
      console.log(data);
    } catch (error) {
      // Trata erros de rede ou da API
      setAlerta("Erro ao fazer login, credenciais incorretas.");
      console.error("Erro durante o login:", error);
    } finally {
      setIsLoading(false);
      setEmail("");
      setSenha("");
    }
  }

  return (
    <div className={styles.login}>
      <Link to={"/"}>
        <img src="./BoraImpactar.png" alt="BoraImpactarLogo" />
      </Link>
      <div className={styles.loginTab}>
        <h2>Entrar como Ong</h2>
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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            disabled={isLoading}
          />
          {alerta !== "" && <p>{alerta}</p>}
        </div>
        <div className={styles.inputField}>
          <Button
            customClass={styles.customClass1}
            onClick={handleEntrar}
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
