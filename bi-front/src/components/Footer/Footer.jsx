import { Link } from "react-router-dom";
import Logo from "../Logo/logo";

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-center bg-[#009fe3]">
      <div className="flex w-[1366px] max-w-full gap-8 px-4 py-16 lg:gap-16 lg:px-[123px]">
        <div className="flex flex-col gap-4 lg:w-[224px]">
          <span>
            <Logo />
          </span>
          <h3 className="text-[20px] font-bold text-white">Hub de Doações</h3>
          <p className="text-white lg:w-[224px] lg:text-[20px]">
            A união que transforma vidas
          </p>
        </div>
        <div className="flex w-1/2 flex-col gap-4 lg:w-[224px]">
          <h3 className="text-[20px] font-bold text-white">Links Rápidos</h3>
          <ul className="flex list-none flex-col gap-3 text-white underline">
            <Link to={"/"}>
              <li>Página Inicial</li>
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
