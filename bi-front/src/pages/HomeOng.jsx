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
    setModalConfirm,
  } = useContext(ModalContext);

  const location = useLocation();
  useEffect(() => {
    setModalAdicionarRepasse(false);
    setModalAdicionarSolicitacao(false);
    setModalSearch(false);
    setModalConfirm(false);
    return () => {
      setModalAdicionarRepasse(false);
      setModalAdicionarSolicitacao(false);
      setModalSearch(false);
      setModalConfirm(false);
    };
  }, [
    location,
    setModalAdicionarRepasse,
    setModalAdicionarSolicitacao,
    setModalSearch,
    setModalConfirm,
  ]);

  return (
    <>
      <Toaster
        containerStyle={{
          marginTop: "80px",
        }}
        toastOptions={{
          style: { borderRadius: "4px", backgroundColor: "#cef0ff" },
          position: "top-right",
        }}
      />
      <div className="flex w-full max-w-[1366px] flex-col items-center gap-16 px-[123px] py-16">
        <div className="flex w-full flex-col items-center gap-12">
          <div className="flex gap-4">
            <NavLink
              to={"solicitacoes"}
              className={({ isActive }) =>
                `flex h-12 w-[256px] items-center justify-center rounded border-b-4 text-[20px] font-bold text-[#292929] transition-all duration-100 ease-in-out ${isActive ? "border-[#2288c9] bg-[#eaeaea]" : "border-[#bcbcbc] bg-[#d0d0d0] hover:bg-[#eaeaea]"}`
              }
            >
              Solicitações
            </NavLink>
            <NavLink
              to={"repasse"}
              className={({ isActive }) =>
                `flex h-12 w-[256px] items-center justify-center rounded border-b-4 text-[20px] font-bold text-[#292929] transition-all duration-100 ease-in-out ${isActive ? "border-[#2288c9] bg-[#eaeaea]" : "border-[#bcbcbc] bg-[#d0d0d0] hover:bg-[#eaeaea]"}`
              }
            >
              Repasse
            </NavLink>
          </div>
          <Outlet />
        </div>
        <div className="py-b-16 flex w-full max-w-[1366px] flex-col items-center gap-8 px-[123px]">
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl font-bold">
              Encontrar recursos compartilhados por outras ONGs
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
              imgUrl={"/financeiro.jpg"}
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
            className="h-[64px] w-[256px] cursor-pointer rounded-sm border-3 border-solid border-[#232323b6] bg-none px-2 py-3 text-[18px] font-medium text-[#232323] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[rgba(27,46,53,0.075)] disabled:opacity-70"
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
