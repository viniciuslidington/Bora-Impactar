import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center gap-8 bg-[#009fe3]">
      <p className="text-center text-[56px] leading-18 text-white [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
        <span className="text-[80px] font-bold">404</span> <br />
        Página não encontrada!
      </p>
      <Button
        onClick={() => navigate("/")}
        className="font-med h-16 w-80 cursor-pointer rounded bg-white text-[18px] text-gray-700 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all duration-200 hover:bg-blue-100"
      >
        Voltar ao início
      </Button>
    </div>
  );
}
