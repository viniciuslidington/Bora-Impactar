import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "../components/Logo/logo";
import Button from "../components/Button/Button";
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
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-[#a8dff7]">
      <Link to={"/"}>
        <img
          src="./BoraImpactar.png"
          alt="BoraImpactarLogo"
          className="w-52 md:w-64"
        />
      </Link>
      <div className="md: flex min-h-[392px] w-[308px] flex-col items-center justify-center gap-6 rounded-md bg-white p-12 shadow-md md:min-h-[400px] md:w-[340px] md:gap-5">
        <h2 className="text-2xl font-bold">Entrar como ONG</h2>
        <div className="flex w-3/4 flex-col gap-2">
          <input
            type="text"
            placeholder=" Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            className="h-12 rounded-md border-2 border-gray-400 p-2"
          />
          <input
            type="password"
            placeholder=" Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            className="h-12 rounded-md border-2 border-gray-400 p-2"
          />
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <Button
            className="h-16 w-[320] max-w-xs rounded-md bg-[#294bb6] font-bold text-white hover:bg-[#294ab61e]"
            onClick={handleSubmit}
            disabled={isPending}
          >
            Entrar
          </Button>
          <a href="#" className="pl-2 text-sm text-[#294bb6]">
            Esqueceu a senha?
          </a>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <h3 className="text-sm">Não possui conta?</h3>
          <Button className="h-16 w-full rounded-md border-2 border-[#294bb6] text-[#294bb6] hover:bg-[#294ab61e]">
            Criar Conta
          </Button>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Logo className="w-32 md:w-40" />
      </div>
    </div>
  );
}
