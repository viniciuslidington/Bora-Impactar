import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "../components/Logo/logo";
import Button from "../components/Button/Button";
import { useCallback, useEffect, useState } from "react";
import { useLogin, useUserData } from "../services/authService";
import { Toaster } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/ong/home/solicitacoes"; // Redireciona para a página principal se não vier de uma rota protegida

  const { data } = useUserData();
  const { mutate: login, isPending } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(() => {
    if (email === "" || password === "") {
      return toast.error("Preencha os campos corretamente.");
    }
    if (!email.includes("@") || !email.includes(".")) {
      return toast.error("Por favor, insira um email válido.");
    }
    login({ email: email, password: password });
    setEmail("");
    setPassword("");
  }, [email, password, login]);

  useEffect(() => {
    data && navigate(from, { replace: true });
  }, [data, from, navigate]);

  useEffect(() => {
    function handleEnter(e) {
      if (e.key === "Enter") {
        handleSubmit();
      }
    }

    document.addEventListener("keypress", handleEnter);
    return () => {
      document.removeEventListener("keypress", handleEnter);
    };
  }, [handleSubmit]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-[#a8dff7]">
      <Toaster
        toastOptions={{
          style: { borderRadius: "4px" },
          position: "top-right",
        }}
      />
      <Link to={"/"}>
        <img src="./BoraImpactar.png" alt="BoraImpactarLogo" className="w-64" />
      </Link>
      <div className="flex max-w-[90%] flex-col items-center justify-center gap-4 rounded-sm bg-white px-12 py-8 shadow-md">
        <h2 className="text-2xl font-bold">Entrar como ONG</h2>
        <div className="flex w-full flex-col gap-2">
          <input
            type="text"
            placeholder=" Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            className="flex h-12 w-[264px] max-w-full rounded-sm border-2 border-gray-400 p-2"
          />
          <input
            type="password"
            placeholder=" Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            className="h-12 w-[264px] max-w-full rounded-sm border-2 border-gray-400 p-2"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            addClassName="h-12 w-[264px] max-w-full"
          >
            Entrar
          </Button>
          <a href="#" className="w-fit text-sm text-[#294bb6] underline">
            Esqueceu a senha?
          </a>
        </div>
        <div className="flex w-full max-w-full flex-col items-center gap-2">
          <h3 className="text-base">Não possui conta?</h3>
          <Button className="flex h-12 w-[264px] max-w-full cursor-pointer items-center justify-center rounded-sm border-2 bg-none px-2 py-3 text-base font-medium text-[#294bb6] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#294ab61e] disabled:opacity-70">
            Criar Conta
          </Button>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Logo className="w-40" />
      </div>
    </div>
  );
}
