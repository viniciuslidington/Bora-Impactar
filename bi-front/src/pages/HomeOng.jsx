import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import Grid from "../components/Grid/Grid";
import GridBox from "../components/GridBox/GridBox";
import { Toaster } from "react-hot-toast";
import HomePosts from "../components/HomePosts/HomePostsOng";
import Button from "../components/Button/Button";
import { useContext, useEffect } from "react";
import { ModalContext } from "../components/contexts/ModalContext";
import ModalAdicionarSol from "../components/ModalAdicionar/ModalAdicionarSolicitacao";
import ModalAdicionarRep from "../components/ModalAdicionar/ModalAdicionarRepasse";
import ModalSearch from "../components/ModalSearch/ModalSearch";

export default function Home() {
  const navigate = useNavigate();
  const {
    modalAdicionarSolicitacao,
    modalAdicionarRepasse,
    setModalAdicionarSolicitacao,
    setModalAdicionarRepasse,
    modalSearch,
    setModalSearch,
    setModalImage,
    setModalImageOnline,
  } = useContext(ModalContext);

  const location = useLocation();
  useEffect(() => {
    setModalAdicionarRepasse(false);
    setModalAdicionarSolicitacao(false);
    setModalSearch(false);
    setModalImage(false);
    setModalImageOnline(false);
    return () => {
      setModalAdicionarRepasse(false);
      setModalAdicionarSolicitacao(false);
      setModalSearch(false);
      setModalImage(false);
      setModalImageOnline(false);
    };
  }, [
    location,
    setModalAdicionarRepasse,
    setModalAdicionarSolicitacao,
    setModalSearch,
    setModalImage,
    setModalImageOnline,
  ]);

  return (
    <>
      <Toaster
        containerStyle={{
          marginTop: "80px",
        }}
        toastOptions={{
          style: { borderRadius: "4px", backgroundColor: "#cef0ff" },
          position: window.innerWidth <= 768 ? "top-center" : "top-right",
        }}
      />
      <div className="flex w-full max-w-full flex-col items-center gap-12 px-4 py-12 lg:max-w-[1366px] lg:gap-16 lg:px-[123px] lg:py-16">
        <div className="flex w-full flex-col items-center gap-8 lg:gap-12">
          <div className="flex w-full gap-4 lg:w-auto">
            <NavLink
              to={"solicitacoes"}
              className={({ isActive }) =>
                `flex h-12 w-1/2 items-center justify-center rounded border-b-4 text-[20px] font-bold text-[#292929] transition-all duration-100 ease-in-out lg:w-[256px] ${isActive ? "border-[#2288c9] bg-[#eaeaea]" : "border-[#bcbcbc] bg-[#d0d0d0] hover:bg-[#eaeaea]"}`
              }
            >
              Solicitações
            </NavLink>
            <NavLink
              to={"repasse"}
              className={({ isActive }) =>
                `flex h-12 w-1/2 items-center justify-center rounded border-b-4 text-[20px] font-bold text-[#292929] transition-all duration-100 ease-in-out lg:w-[256px] ${isActive ? "border-[#2288c9] bg-[#eaeaea]" : "border-[#bcbcbc] bg-[#d0d0d0] hover:bg-[#eaeaea]"}`
              }
            >
              Repasse
            </NavLink>
          </div>
          <Outlet />
        </div>
        <div className="flex w-full max-w-[1366px] flex-col items-center gap-6 lg:gap-8 lg:py-16">
          <div className="flex flex-col items-center gap-3 lg:gap-3">
            <h2 className="text-center text-xl font-bold lg:text-2xl">
              Encontre recursos compartilhados por outras ONGs
            </h2>
            <p className="text-base font-normal">Categorais Recorrentes</p>
          </div>
          <Grid>
            <GridBox
              imgUrl={"/Roupas.jpg"}
              link={"/ong/search?page=1&category=ROUPAS_E_CALCADOS"}
            >
              Roupas e Calçados
            </GridBox>
            <GridBox
              imgUrl={"/MateriasEducativos.jpg"}
              link={
                "/ong/search?page=1&category=MATERIAIS_EDUCATIVOS_E_CULTURAIS"
              }
            >
              Materiais Educativos e Culturais
            </GridBox>
            <GridBox
              imgUrl={"/Medicamentos.jpg"}
              link={"/ong/search?page=1&category=SAUDE_E_HIGIENE"}
              s
            >
              Saúde e Higiene
            </GridBox>
            <GridBox
              imgUrl={"/UtensiliosP.jpg"}
              link={"/ong/search?page=1&category=UTENSILIOS_GERAIS"}
            >
              Utensílios Gerais
            </GridBox>
            <GridBox
              imgUrl={"/Inclusaoemobilidade.jpg"}
              link={
                "/ong/search?page=1&category=ITENS_DE_INCLUSAO_E_MOBILIDADE"
              }
            >
              Itens de Inclusão e Mobilidade
            </GridBox>
            <GridBox
              imgUrl={"/Móveis.jpg"}
              link={"/ong/search?page=1&category=ELETRODOMESTICOS_E_MOVEIS"}
            >
              Eletrodomésticos e Móveis
            </GridBox>
            <GridBox
              imgUrl={"/pet.jpg"}
              link={"/ong/search?page=1&category=ITENS_PET"}
            >
              Itens Pet
            </GridBox>
            <GridBox
              imgUrl={"/Eletronicos.jpg"}
              link={"/ong/search?page=1&category=ELETRONICOS"}
            >
              Eletrônicos
            </GridBox>
            <GridBox
              imgUrl={"/Outrosgrid.jpg"}
              link={"/ong/search?page=1&category=OUTROS"}
            >
              Outros
            </GridBox>
          </Grid>
          <Button
            className="h-[64px] w-full cursor-pointer rounded-sm border-3 border-solid border-[#232323b6] bg-none px-2 py-3 text-[18px] font-medium text-[#232323] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[rgba(27,46,53,0.075)] disabled:opacity-70 lg:w-[256px]"
            onClick={() => navigate("/ong/search")}
          >
            Ver todas publicações
          </Button>
        </div>
        <HomePosts setModalSearch={setModalSearch} />

        {modalAdicionarSolicitacao && <ModalAdicionarSol />}
        {modalAdicionarRepasse && <ModalAdicionarRep />}
        {modalSearch && <ModalSearch />}
      </div>
    </>
  );
}
