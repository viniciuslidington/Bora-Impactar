import { useLocation, useNavigate } from "react-router-dom";
import Grid from "../components/Grid/Grid";
import GridBox from "../components/GridBox/GridBox";
import Button from "../components/Button/Button";
import HomePosts from "../components/HomePosts/HomePostsVol";
import { useContext, useEffect, useRef } from "react";
import { ModalContext } from "../components/contexts/ModalContext";
import ModalSearch from "../components/ModalSearch/ModalSearch";

export default function Home() {
  const navigate = useNavigate();
  const { setModalSearch, modalSearch } = useContext(ModalContext);
  const scrollTo = useRef(null);

  const scrollToComponent = () => {
    scrollTo.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const location = useLocation();
  useEffect(() => {
    setModalSearch(false);
    return () => setModalSearch(false);
  }, [location, setModalSearch]);

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className="absolute top-[88px] left-0 -z-10 hidden h-[580px] w-full lg:flex"
        style={{
          backgroundImage: `
          linear-gradient(0deg, rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0.64) 100%),
          linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #fff 64.5%),
          url('/homevoluntario.jpg')
        `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>{" "}
      <div className="flex w-[1366px] max-w-full flex-col gap-6 px-4 py-10 lg:h-[580px] lg:px-[123px]">
        <img
          src="/BoraImpactar.png"
          alt="Logo"
          className="w-4/5 lg:w-[351px]"
        />
        <h1 className="text-3xl font-bold lg:text-[56px]">
          Encontre a Oportunidade Perfeita para Ajudar
        </h1>

        <p className="w-[816px] max-w-full text-justify text-sm leading-[1.8] lg:text-start lg:text-base">
          Conecte-se com ONGs que precisam do seu apoio. Explore as publicações
          e descubra onde suas habilidades e vontade de fazer a diferença são
          mais necessárias.
        </p>
        <div className="flex gap-8">
          <Button
            className="h-16 w-full cursor-pointer rounded-sm border-none bg-[#294bb6] px-2 py-3 text-[18px] font-bold text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#335fee] disabled:opacity-70 lg:h-[80px] lg:w-[256px]"
            onClick={() => navigate("/voluntario/search")}
          >
            Ver demandas
          </Button>
        </div>
        <svg
          className="mt-[36px] hidden h-12 w-12 cursor-pointer self-center fill-current text-[#292929] lg:flex"
          viewBox="0 0 48 48"
          onClick={scrollToComponent}
        >
          <g>
            <path
              d="M25 45a14 14 0 0 0 14-14V19a14 14 0 0 0-28 0v12a14 14 0 0 0 14 14zM13 19a12 12 0 0 1 24 0v12a12 12 0 0 1-24 0z"
              fill="currentColor"
            ></path>
            <path
              d="M24 24.5h.09l.2.21a1 1 0 0 0 1.42 0l.2-.21H26v-.09l5.71-5.7-1.42-1.42-4.29 4.3V11h-2v10.59l-4.29-4.3-1.42 1.42 5.71 5.7z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      </div>
      <div
        className="flex w-full max-w-[1366px] flex-col items-center gap-6 px-4 pt-5 pb-16 lg:gap-8 lg:px-[123px] lg:py-16"
        ref={scrollTo}
      >
        <div className="flex flex-col items-center gap-2 lg:gap-3">
          <h2 className="text-[20px] font-bold">
            Saiba como você pode ajudar as Ongs
          </h2>
          <p className="text-base font-normal">Categorias mais recorrentes</p>
        </div>
        <Grid>
          <GridBox
            imgUrl={"/Roupas.jpg"}
            link={"/voluntario/search?page=1&category=ROUPAS_E_CALCADOS"}
          >
            Roupas e Calçados
          </GridBox>
          <GridBox
            imgUrl={"/MateriasEducativos.jpg"}
            link={
              "/voluntario/search?page=1&category=MATERIAIS_EDUCATIVOS_E_CULTURAIS"
            }
          >
            Materiais Educativos e Culturais
          </GridBox>
          <GridBox
            imgUrl={"/Medicamentos.jpg"}
            link={"/voluntario/search?page=1&category=SAUDE_E_HIGIENE"}
            s
          >
            Saúde e Higiene
          </GridBox>
          <GridBox
            imgUrl={"/UtensiliosP.jpg"}
            link={"/voluntario/search?page=1&category=UTENSILIOS_GERAIS"}
          >
            Utensílios Gerais
          </GridBox>
          <GridBox
            imgUrl={"/Inclusaoemobilidade.jpg"}
            link={
              "/voluntario/search?page=1&category=ITENS_DE_INCLUSAO_E_MOBILIDADE"
            }
          >
            Itens de Inclusão e Mobilidade
          </GridBox>
          <GridBox
            imgUrl={"/Móveis.jpg"}
            link={
              "/voluntario/search?page=1&category=ELETRODOMESTICOS_E_MOVEIS"
            }
          >
            Eletrodomésticos e Móveis
          </GridBox>
          <GridBox
            imgUrl={"/pet.jpg"}
            link={"/voluntario/search?page=1&category=ITENS_PET"}
          >
            Itens Pet
          </GridBox>
          <GridBox
            imgUrl={"/Eletronicos.jpg"}
            link={"/voluntario/search?page=1&category=ELETRONICOS"}
          >
            Eletrônicos
          </GridBox>
          <GridBox
            imgUrl={"/Outrosgrid.jpg"}
            link={"/voluntario/search?page=1&category=OUTROS"}
          >
            Outros
          </GridBox>
        </Grid>
        <Button
          className="h-[64px] w-full cursor-pointer rounded-sm border-3 border-solid border-[#232323b6] bg-none px-2 py-3 text-[18px] font-medium text-[#232323] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[rgba(27,46,53,0.075)] disabled:opacity-70 lg:w-[256px]"
          onClick={() => navigate("/voluntario/search")}
        >
          Ver todas publicações
        </Button>
      </div>
      <HomePosts setModalSearch={setModalSearch} />
      {modalSearch && <ModalSearch solicitacao={true} />}
    </div>
  );
}
