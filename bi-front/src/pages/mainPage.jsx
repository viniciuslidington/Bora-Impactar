import { useNavigate } from "react-router-dom";
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import Grid from "../components/Grid/Grid";
import GridBox from "../components/GridBox/GridBox";
import Profile from "../components/Profile/Profile";
import { useUserData } from "../services/authService";

export default function MainPage() {
  const navigate = useNavigate();
  const { data } = useUserData();

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className="absolute top-0 left-0 -z-10 h-[708px] w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
          linear-gradient(0deg, rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0.64) 100%),
          linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #fff 64.5%),
          url('/RecifeAntigo.jpg')
        `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
        }}
      ></div>{" "}
      {/* essas linhas de back tiveram quer ser feitas, pq quando adptei para tailwind ficou uma linha da foto em baixo sem a sobreposição branca */}
      <Header>
        <Profile />
      </Header>
      <div className="flex w-[1366px] max-w-full flex-col justify-center gap-8 px-[123px] py-[40px]">
        <img
          src="/BoraImpactar.png"
          alt="Logo"
          className="-mb-[16px] h-[92px] w-[351px]"
        />
        <h1 className="text-[56px] font-bold">
          Doe hoje, transforme vidas para sempre!
        </h1>
        <p className="w-[816px] max-w-full leading-[1.8]">
          No Bora Impactar, você pode doar recursos diretamente para ONGs que
          transformam vidas e comunidades todos os dias. Conecte-se a causas que
          precisam de você e ajude a construir um futuro mais justo e solidário.
          Juntos, podemos gerar um impacto real. Vem fazer parte dessa rede de
          transformação!
        </p>
        <div className="flex gap-8">
          <Button
            className="h-[80px] w-[256px] cursor-pointer rounded-sm border-none bg-[#294bb6] px-2 py-3 text-[18px] font-bold text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#335fee] disabled:opacity-70"
            onClick={() => navigate("voluntario")}
          >
            Sou Voluntário
          </Button>
          <Button
            className="h-[80px] w-[256px] cursor-pointer rounded-sm border-3 border-solid border-[#009fe3] bg-transparent px-2 py-3 text-[18px] font-[600] text-[#009fe3] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#4eb3df13] disabled:opacity-70"
            onClick={() =>
              data ? navigate("/ong/home/solicitacoes") : navigate("/login")
            }
          >
            Sou ONG
          </Button>
        </div>
        <div className="mt-16 flex w-full flex-nowrap justify-center gap-8 self-center">
          <div className="flex h-[116px] flex-1 flex-col items-center justify-center rounded-sm bg-[#009fe3] shadow-md">
            <span className="text-4xl font-bold text-white drop-shadow-md">
              Doar:
            </span>
            <p className="w-auto text-lg font-bold text-white">
              Doe e transforme vidas.
            </p>
          </div>
          <div className="flex h-[116px] flex-1 flex-col items-center justify-center rounded-sm bg-[#009fe3] shadow-md">
            <span className="text-4xl font-bold text-white">Pedir:</span>
            <p className="w-auto text-lg font-bold text-white">
              ONGs pedem, a ajuda vem.
            </p>
          </div>
          <div className="flex h-[116px] flex-1 flex-col items-center justify-center rounded-sm bg-[#009fe3] shadow-md">
            <span className="text-4xl font-bold text-white">Repassar:</span>
            <p className="w-auto text-lg font-bold text-white">
              ONGs compartilham com ONGs.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 px-[20px] py-10 md:px-[123px]">
        <h2 className="text-5xl font-medium">Ajude as causas das ONGs</h2>
        {/* controlando largura total do grid */}
        <Grid className="w-[640px] lg:w-[928px]">
          <GridBox imgUrl={"./Alimentos.jpg"}>Doar Alimentos</GridBox>
          <GridBox imgUrl={"./Serviço.jpg"}>Voluntariar Horas</GridBox>
          <GridBox imgUrl={"./Medicamentos.jpg"}>
            Doar Medicamentos e Itens de Higiene
          </GridBox>
          <GridBox imgUrl={"./Brinquedos.jpg"}>
            Doar brinquedos e livros
          </GridBox>
          <GridBox imgUrl={"./Roupas.jpg"}>Doar Roupas</GridBox>
          <GridBox imgUrl={"./Móveis.jpg"}>Doar Alimentos</GridBox>
        </Grid>
        <Button className="h-[64px] w-[256px] cursor-pointer rounded-sm border-3 border-solid border-[#232323b6] bg-none px-2 py-3 text-[18px] font-medium text-[#232323] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[rgba(27,46,53,0.075)] disabled:opacity-70">
          Ver outras categorias
        </Button>
      </div>
      <div className="mt-10 flex h-[460px] w-full justify-center bg-[#d9d9d9]">
        <div className="flex w-[1366px] flex-col items-center justify-center gap-10 p-[40px_123px]">
          <h2 className="text-[48px] font-medium">Sou ONG, como funciona?</h2>
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="flex flex-col items-center gap-4">
              <img src="./Recursos.svg" alt="recursos" className="w-[80px]" />
              <h3 className="text-[24px] font-bold">Realocação de Recursos</h3>
              <p className="w-[256px] text-justify hyphens-auto">
                Aproveite ao máximo os itens próximos da data de validade,
                garantindo seu rápido consumo e evitando desperdícios.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <img src="./Trocas.svg" alt="trocas" className="w-[80px]" />
              <h3 className="text-[24px] font-bold">Realocação de Recursos</h3>
              <p className="w-[256px] text-justify hyphens-auto">
                Conecte-se a outras ONGs para trocar recursos e atender
                necessidades específicas.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <img src="./Doações.svg" alt="doações" className="w-[80px]" />
              <h3 className="text-[24px] font-bold">Realocação de Recursos</h3>
              <p className="w-[256px] text-justify hyphens-auto">
                Permita que voluntários contribuam com itens ou serviços,
                fortalecendo sua causa.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[1366px] flex-col items-center justify-center gap-12 p-[64px_123px]">
        <h3 className="text-[36px] font-medium">
          Faça parte dessa mudança. Bora Impactar!
        </h3>
        <div className="flex gap-8">
          {" "}
          {/* achar onde separar os botões, gap entre */}
          <Button
            className="h-[80px] w-[256px] cursor-pointer rounded-sm border-none bg-[#294bb6] px-2 py-3 text-[18px] font-bold text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#335fee] disabled:opacity-70"
            onClick={() => navigate("/voluntario/home")}
          >
            Sou Voluntário
          </Button>
          <Button
            className="h-[80px] w-[256px] cursor-pointer rounded-sm border-3 border-solid border-[#009fe3] bg-transparent px-2 py-3 text-[18px] font-[600] text-[#009fe3] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#4eb3df13] disabled:opacity-70"
            onClick={() =>
              data ? navigate("/ong/home/solicitacoes") : navigate("/login")
            }
          >
            Sou ONG
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
