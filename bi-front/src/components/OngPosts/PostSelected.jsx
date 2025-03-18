import { useReducer } from "react";
import styles from "./post.module.css";
import Button from "../Button/Button";
import PropTypes from "prop-types";

export default function PostSelected({
  publicacaoFormatada,
  expiracaoFormatada,
  setSelectedId,
  post,
  setDatabaseState,
  databaseState,
}) {
  const initialState = {
    titulo: post.titulo,
    categoria: post.categoria,
    urgencia: post.urgencia,
    descricao: post.descricao,
    imageUrl: post.imageUrl,
  };

  const [{ titulo, categoria, urgencia, descricao, imageUrl }, dispatch] =
    useReducer(reduce, initialState);

  function handleSalvar(e) {
    e.preventDefault();

    const state = { titulo, categoria, urgencia, descricao, imageUrl };
    if (areStatesEqual(state, initialState)) {
      setSelectedId("");
      return; // Se não houver edições, a ação é previnida
    }

    if (
      titulo === "" ||
      categoria === "" ||
      urgencia === "" ||
      descricao === "" ||
      imageUrl === ""
    ) {
      return alert("Preencha todos os campos!");
    }

    setDatabaseState(
      databaseState.map((p) => {
        if (p.id === post.id) {
          return { ...p, titulo, categoria, urgencia, descricao, imageUrl };
        } else return p;
      }),
    );
    setSelectedId(""); //Fechar form após salvar
  }
  function handleEncerrar(e) {
    e.preventDefault();
    if (confirm("Tem certeza que deseja encerrar publicação?")) {
      setDatabaseState(
        databaseState.filter((p) => {
          if (p.id === post.id) {
            return;
          } else return p;
        }),
      );
    }

    setSelectedId(""); //Fechar form após salvar
  }

  return (
    <form className={styles.selectedPost}>
      <label htmlFor="fileInput">
        <img src="/placeholder-image.jpg" alt="Editar Imagem do Post" />
        <img src="/edit.svg" alt="Icone de Editar Imagem" />
      </label>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="fileInput"
      />
      <div className={styles.mainContentSelected}>
        <p className={styles.publicadoSelected}>
          Publicado: {publicacaoFormatada}
        </p>
        <span className="flex w-1/2 justify-end">
          <img
            src="/x.svg"
            alt="x"
            onClick={() => setSelectedId("")}
            className="w-4 cursor-pointer opacity-90"
          />
        </span>
        <label htmlFor="tituloSelected" className={styles.labelSelected}>
          <p>Titulo</p>
          <input
            type="text"
            placeholder="Informe um título breve e claro..."
            id="tituloSelected"
            value={titulo}
            onChange={(e) =>
              dispatch({ type: "titulo", payload: `${e.target.value}` })
            }
          />
        </label>
        <label htmlFor="categoriaSelected" className={styles.labelSelected}>
          <p>Categoria</p>
          <select
            name="editSelect"
            id="categoriaSelected"
            value={categoria}
            onChange={(e) =>
              dispatch({ type: "categoria", payload: `${e.target.value}` })
            }
          >
            <option value="alimentos">Alimentos</option>
            <option value="kit_de_casa">Kit de casa</option>
            <option value="saude_e_higiene">Saúde e higiene</option>
            <option value="brinquedos_e_livros">Brinquedos e livros</option>
            <option value="moveis">Móveis</option>
            <option value="utensilios">Utensílios</option>
            <option value="itens_para_pets">Itens para pets</option>
            <option value="servicos">Serviços</option>
            <option value="eletrodomesticos">Eletrodomésticos</option>
            <option value="roupas">Roupas</option>
            <option value="ajuda_financeira">Ajuda Financeira</option>
            <option value="geral">Outra opção</option>
          </select>
        </label>
        <label className={styles.labelSelected}>
          <p>Urgência</p>
          <div className={styles.radiosSelected}>
            <input
              type="radio"
              name="urgenciaSelected"
              className={styles.urgenciaSelected}
              value="alta"
              checked={urgencia === "alta"}
              onChange={(e) =>
                dispatch({ type: "urgencia", payload: e.target.value })
              }
            />
            <p>Alta</p>
            <input
              type="radio"
              name="urgenciaSelected"
              className={styles.urgenciaSelected}
              value="media"
              checked={urgencia === "media"}
              onChange={(e) =>
                dispatch({ type: "urgencia", payload: e.target.value })
              }
            />
            <p>Média</p>
            <input
              type="radio"
              name="urgenciaSelected"
              className={styles.urgenciaSelected}
              value="baixa"
              checked={urgencia === "baixa"}
              onChange={(e) =>
                dispatch({ type: "urgencia", payload: e.target.value })
              }
            />
            <p>Baixa</p>
          </div>
        </label>
        <div className={styles.divEncerrarBtn}>
          <p>{expiracaoFormatada}</p>
          <Button
            className="flex h-[38px] w-[179px] cursor-pointer items-center justify-center rounded-sm border-[2.5px] border-solid border-[#f37171] bg-none px-2 py-3 text-base font-medium text-[#f37171] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#f38e8e2d] disabled:opacity-70"
            onClick={(e) => handleEncerrar(e)}
          >
            Encerrar Solicitação
          </Button>
        </div>
      </div>
      <label htmlFor="tituloSelected" className={styles.labelSelected}>
        <p>Descrição</p>
        <textarea
          rows="7"
          type="text"
          placeholder="Informe uma descrição completa e clara..."
          id="tituloSelected"
          value={descricao}
          onChange={(e) =>
            dispatch({ type: "descricao", payload: e.target.value })
          }
        />
      </label>
      <div className={styles.divSalvarBtn}>
        <p></p>
        <Button
          addClassName=" py-[12px] px-[16px] w-[179px]"
          onClick={(e) => handleSalvar(e)}
        >
          Salvar Alterações
        </Button>
      </div>
    </form>
  );
}

PostSelected.propTypes = {
  publicacaoFormatada: PropTypes.string.isRequired,
  expiracaoFormatada: PropTypes.string.isRequired,
  setSelectedId: PropTypes.node.isRequired,
  post: PropTypes.object.isRequired,
  databaseState: PropTypes.array.isRequired,
  setDatabaseState: PropTypes.func.isRequired,
};

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
    case "imageUrl":
      return { ...state, imageUrl: action.payload };

    default:
      return state;
  }
}

const areStatesEqual = (state1, state2) => {
  return (
    state1.titulo === state2.titulo &&
    state1.categoria === state2.categoria &&
    state1.urgencia === state2.urgencia &&
    state1.descricao === state2.descricao &&
    state1.imageUrl === state2.imageUrl
  );
};
