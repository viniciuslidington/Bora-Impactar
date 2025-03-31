import { useNavigate } from "react-router-dom";
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import Grid from "../components/Grid/Grid";
import GridBox from "../components/GridBox/GridBox";
import Profile from "../components/Profile/Profile";
import { useUserData } from "../services/authService";
import boraImpactarImg from "../assets/BoraImpactar.png";
import heroImg from "../assets/heroImage.jpg";
import roupasImg from "../assets/Roupas.jpg";
import materiasEducativosImg from "../assets/MateriasEducativos.jpg";
import medicamentosImg from "../assets/Medicamentos.jpg";
import utensiliosImg from "../assets/UtensiliosP.jpg";
import inclusaoMobilidadeImg from "../assets/Inclusaoemobilidade.jpg";
import moveisImg from "../assets/Móveis.jpg";
import lupaImg from "../assets/lupa.svg";
import recursosImg from "../assets/recursos.svg";
import contribuaImg from "../assets/contribua.svg";

export default function MainPage() {
  const navigate = useNavigate();
  const { data } = useUserData();

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className="absolute top-0 left-0 -z-10 h-[668px] w-full"
        style={{
          backgroundImage: `
          linear-gradient(0deg, rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0.64) 100%),
          linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #fff 64.5%),
          url(${heroImg})
        `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>{" "}
      <Header>
        <Profile />
      </Header>
      <div className="flex w-[1366px] max-w-full flex-col justify-center gap-6 px-[123px] py-10">
        <img src={boraImpactarImg} alt="Logo" className="w-[351px]" />
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
        <div className="mt-10 flex w-full flex-nowrap justify-center gap-8 self-center">
          <div className="flex h-[116px] flex-1 flex-col items-center justify-center rounded-sm bg-[#009fe3] shadow-md">
            <span className="text-4xl font-bold text-white [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
              Doar
            </span>
            <p className="w-auto text-[20px] font-bold text-white [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
              Doe e transforme vidas.
            </p>
          </div>
          <div className="flex h-[116px] flex-1 flex-col items-center justify-center rounded-sm bg-[#009fe3] shadow-md">
            <span className="text-4xl font-bold text-white [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
              Pedir
            </span>
            <p className="w-auto text-[20px] font-bold text-white [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
              ONGs pedem, a ajuda vem.
            </p>
          </div>
          <div className="flex h-[116px] flex-1 flex-col items-center justify-center rounded-sm bg-[#009fe3] shadow-md">
            <span className="text-4xl font-bold text-white [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
              Repassar
            </span>
            <p className="w-auto text-[20px] font-bold text-white [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
              ONGs compartilham entre ONGs.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 px-[20px] py-10 md:px-[123px]">
        <h2 className="text-5xl font-medium">Ajude as causas das ONGs</h2>
        {/* controlando largura total do grid */}
        <Grid>
          <GridBox
            imgUrl={roupasImg}
            link={"/voluntario/search?page=1&category=ROUPAS_E_CALCADOS"}
          >
            Roupas e Calçados
          </GridBox>
          <GridBox
            imgUrl={materiasEducativosImg}
            link={
              "/voluntario/search?page=1&category=MATERIAIS_EDUCATIVOS_E_CULTURAIS"
            }
          >
            Materiais Educativos e Culturais
          </GridBox>
          <GridBox
            imgUrl={medicamentosImg}
            link={"/voluntario/search?page=1&category=SAUDE_E_HIGIENE"}
            s
          >
            Saúde e Higiene
          </GridBox>
          <GridBox
            imgUrl={utensiliosImg}
            link={"/voluntario/search?page=1&category=UTENSILIOS_GERAIS"}
          >
            Utensílios Gerais
          </GridBox>
          <GridBox
            imgUrl={inclusaoMobilidadeImg}
            link={
              "/voluntario/search?page=1&category=ITENS_DE_INCLUSAO_E_MOBILIDADE"
            }
          >
            Itens de Inclusão e Mobilidade
          </GridBox>
          <GridBox
            imgUrl={moveisImg}
            link={
              "/voluntario/search?page=1&category=ELETRODOMESTICOS_E_MOVEIS"
            }
          >
            Eletrodomésticos e Móveis
          </GridBox>
        </Grid>
        <Button
          className="h-[64px] w-[256px] cursor-pointer rounded-sm border-3 border-solid border-[#232323b6] bg-none px-2 py-3 text-[18px] font-medium text-[#232323] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[rgba(27,46,53,0.075)] disabled:opacity-70"
          onClick={() => navigate("/voluntario/home")}
        >
          Ver outras categorias
        </Button>
      </div>
      <div className="mt-10 flex h-[460px] w-full justify-center bg-[#d9d9d9]">
        <div className="flex w-[1366px] flex-col items-center justify-center gap-10 p-[40px_123px]">
          <h2 className="text-[48px] font-medium">Como funciona?</h2>
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="flex flex-col items-center gap-4">
              <img src={lupaImg} alt="recursos" className="w-[80px]" />
              <h3 className="text-[24px] font-bold">Veja os pedidos</h3>
              <p className="w-[256px] text-justify hyphens-auto">
                Acesse agora a lista com pedidos reais feitos por ONGs
                verificadas
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <img src={recursosImg} alt="trocas" className="w-[80px]" />
              <h3 className="text-[24px] font-bold">Escolha o que doar</h3>
              <p className="w-[256px] text-justify hyphens-auto">
                Roupas, materiais escolares, medicamentos, itens de higiene,
                eletrodomésticos e mais.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <img
                src={contribuaImg}
                alt="doações"
                className="h-[100px] w-[100px]"
              />
              <h3 className="-mt-[20px] text-[24px] font-bold">
                Entregue sua ajuda
              </h3>
              <p className="w-[256px] text-justify hyphens-auto">
                Combine a entrega com a ONG e faça sua contribuição chegar onde
                é necessária.
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
