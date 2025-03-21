import { useContext, useRef, useReducer } from "react";
import toast from "react-hot-toast";
import { ModalContext } from "../contexts/ModalContext";
import Button from "../Button/Button";
import styles from "./modalAdicionar.module.css";
import { useAddSolicitacoes } from "../../services/userSolicitacoesService";
import { useUserData } from "../../services/authService";

export default function ModaAdicionar() {
  const { mutate: adicionar } = useAddSolicitacoes();
  const { data } = useUserData();

  const initialState = {
    titulo: "",
    categoria: "",
    urgencia: "",
    descricao: "",
    tempo: "",
    imageUrl: "/placeholder-image.jpg",
  };

  const { setModalAdicionarSolicitacao } = useContext(ModalContext);
  const modalOverlay = useRef();

  const [
    { titulo, categoria, urgencia, descricao, tempo, imageUrl },
    dispatch,
  ] = useReducer(reduce, initialState);

  function handlePublicar() {
    if (
      titulo === "" ||
      categoria === "" ||
      urgencia === "" ||
      descricao === "" ||
      tempo === ""
    ) {
      return toast.error("Preencha todos os campos!");
    }
    adicionar({
      title: titulo,
      category: categoria,
      urgency: urgencia,
      description: descricao,
      ong_Id: data?.userData.ngo.id,
    });
    setModalAdicionarSolicitacao(false);
  }

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
      onClick={(e) => {
        modalOverlay.current === e.target &&
          setModalAdicionarSolicitacao(false);
      }}
      ref={modalOverlay}
    >
      {/*inset-0 da div acima o gpt mandou e eu achei bom*/}
      <div className="relative z-11 flex w-[1120px] gap-4 rounded bg-white p-10">
        <span className="absolute top-4 right-4 z-[12] cursor-pointer">
          <img
            className="h-5 w-5 border-none"
            src="/x.svg"
            alt="fechar"
            onClick={() => setModalAdicionarSolicitacao(false)}
          />
        </span>
        <label
          htmlFor="fileInputAdd"
          className="relative h-[346px] w-[700px] cursor-pointer"
        >
          <img
            src="/placeholder-image.jpg"
            alt="Adicionar Imagem do Post"
            className="h-[346px] w-[400px] flex-none rounded border-2 border-[#eaeaea] object-cover object-center"
          />
          <img
            src="/edit.svg"
            alt="Icone de Adicionar Imagem"
            className="absolute right-[8px] bottom-[8px] h-[48px] w-[48px] overflow-visible rounded-full border-none bg-[#817f7ecc] p-[10px]"
          />
        </label>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="fileInputAdd"
        />
        <div className="flex flex-wrap gap-x-8 gap-y-2 self-start">
          <label htmlFor="titulo" className="flex flex-col gap-1">
            <p className="text-[14px] font-medium">Titulo</p>
            <input
              type="text"
              className="h-[38px] w-[280px] rounded border-none bg-[#eaeaea] px-2 text-[16px] font-normal focus:outline focus:outline-2 focus:outline-[#2323235b]"
              placeholder="Informe um título breve e claro..."
              id="titulo"
              value={titulo}
              onChange={(e) =>
                dispatch({ type: "titulo", payload: e.target.value })
              }
            />
          </label>
          <label htmlFor="categoria" className="flex flex-col gap-1">
            <p className="text-[14px] font-medium">Categoria</p>
            <select
              name="editSelect"
              className="!focus:outline-none h-[38px] w-[200px] rounded border-2 border-[#adadad] text-[14px]"
              id="categoriaSelected"
              value={categoria}
              onChange={(e) =>
                dispatch({ type: "categoria", payload: `${e.target.value}` })
              }
            >
              <option value="" disabled={true}>
                Alimentos
              </option>
              <option value="" disabled={true}>
                Kit de casa
              </option>
              <option value="MEDICAMENTOS_HIGIENE">Saúde e higiene</option>
              <option value="BRINQUEDOS_LIVROS">Brinquedos e livros</option>
              <option value="MOVEIS">Móveis</option>
              <option value="UTENSILIOS">Utensílios gerais</option>
              <option value="ITEMPET">Itens para pets</option>
              <option value="" disabled={true}>
                Serviços
              </option>
              <option value="" disabled={true}>
                Eletrodomésticos e móveis
              </option>
              <option value="" disabled={true}>
                Roupas e calçados
              </option>
              <option value="" disabled={true}>
                Ajuda Financeira
              </option>
              <option value="OUTRA">Outra opção</option>
            </select>
          </label>
          <div className="flex flex-col gap-1" style={{ zIndex: 15 }}>
            <p className="text-[14px] font-medium">Urgência</p>
            <div className="flex w-[64px] flex-wrap gap-x-1 gap-y-[2px]">
              <input
                type="radio"
                name="urgencia"
                className="h-auto w-auto focus:outline-none"
                value="HIGH"
                checked={urgencia === "HIGH"}
                onChange={(e) =>
                  dispatch({ type: "urgencia", payload: e.target.value })
                }
              />
              <p
                className="flex items-center text-sm font-medium"
                style={{ width: "calc(100% - 17px)" }}
              >
                Alta
              </p>
              <input
                type="radio"
                name="urgencia"
                className="h-auto w-auto focus:outline-none"
                value="MEDIUM"
                checked={urgencia === "MEDIUM"}
                onChange={(e) =>
                  dispatch({ type: "urgencia", payload: e.target.value })
                }
              />
              <p
                className="flex items-center text-sm font-medium"
                style={{ width: "calc(100% - 17px)" }}
              >
                Média
              </p>
              <input
                type="radio"
                name="urgencia"
                className="h-auto w-auto focus:outline-none"
                value="LOW"
                checked={urgencia === "LOW"}
                onChange={(e) =>
                  dispatch({ type: "urgencia", payload: e.target.value })
                }
              />
              <p
                className="flex items-center text-sm font-medium"
                style={{ width: "calc(100% - 17px)" }}
              >
                Baixa
              </p>
            </div>
          </div>
          <label
            htmlFor="descricao"
            className="-mt-[18px] flex w-full flex-col gap-1"
          >
            <p className="text-sm font-medium">Descrição</p>
            <textarea
              className="w-auto resize-none rounded border-none bg-[#eaeaea] p-2 font-sans text-base focus:outline-[2px] focus:outline-[#2323235b]"
              rows="8"
              type="text"
              placeholder="Informe uma descrição completa e clara..."
              id="descricao"
              value={descricao}
              onChange={(e) =>
                dispatch({ type: "descricao", payload: e.target.value })
              }
            />
          </label>
          <label htmlFor="tempo" className="flex flex-col gap-1">
            <p className="text-sm font-medium">Tempo de publicação</p>
            <select
              className="h-[38px] w-[200px] rounded border-2 border-[#adadad] text-sm focus:outline-none"
              name="tempo-de-publicacao"
              id="tempo"
              value={tempo}
              onChange={(e) =>
                dispatch({
                  type: "tempo",
                  payload: e.target.value,
                })
              }
            >
              <option value="" disabled={true}>
                Selecionar
              </option>
              <option value="7">7 dias</option>
              <option value="14">14 dias</option>
              <option value="30">30 dias</option>
              <option value="90">90 dias</option>
            </select>
          </label>
          <Button
            addClassName="absolute right-[40px] bottom-[40px] w-[179px] px-4 py-3"
            onClick={handlePublicar}
          >
            Publicar
          </Button>
        </div>
      </div>
    </div>
  );
}

function reduce(state, action) {
  switch (action.type) {
    case "titulo":
      return { ...state, titulo: action.payload };
    case "categoria":
      return { ...state, categoria: action.payload };
    case "urgencia":
      return { ...state, urgencia: action.payload };
    case "descricao":
      return { ...state, descricao: action.payload };
    case "tempo":
      return { ...state, tempo: action.payload };
    case "imageUrl":
      return { ...state, imageUrl: action.payload };

    default:
      return state;
  }
}
