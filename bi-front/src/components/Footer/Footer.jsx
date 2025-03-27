import { Link } from "react-router-dom";
import Logo from "../Logo/logo";

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-center bg-[#009fe3]">
      <div className="flex w-[1366px] gap-16 p-[64px_123px]">
        <div className="flex w-[224px] flex-col gap-4">
          <Logo />
          <h3 className="text-[20px] font-bold text-white">Bora Impactar!</h3>
          <p className="w-[224px] text-[20px] text-white">
            A união que transforma vidas
          </p>
        </div>
        <div className="flex w-[224px] flex-col gap-4">
          <h3 className="text-[20px] font-bold text-white">Links Rápidos</h3>
          <ul className="flex list-none flex-col gap-3 text-white underline">
            <Link to={"/"}>
              <li>MainPage</li>
            </Link>
            <Link to={"/voluntario/home"}>
              <li>Sou Voluntário</li>
            </Link>
            <Link to={"/login"}>
              <li>Sou ONG</li>
            </Link>
            <a
              href="https://conecta.recife.pe.gov.br/"
              target="blank"
              className="text-white"
            >
              <li>Conecta Recife</li>
            </a>
          </ul>
        </div>
      </div>
    </footer>
  );
}
