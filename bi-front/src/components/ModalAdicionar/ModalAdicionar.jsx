import { useContext, useRef, useReducer } from "react";
import toast from "react-hot-toast";
import { ModalContext } from "../contexts/ModalContext";
import Button from "../Button/Button";
import styles from "./modalAdicionar.module.css";

export default function ModaAdicionar() {
  const initialState = {
    titulo: "",
    categoria: "",
    urgencia: "",
    descricao: "",
    tempo: "",
    imageUrl: "/placeholder-image.jpg",
  };

  const { setModalAdicionar } = useContext(ModalContext);
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
    console.log({ titulo, categoria, urgencia, descricao, tempo, imageUrl });
    setModalAdicionar(false);
  }

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        modalOverlay.current === e.target && setModalAdicionar(false);
      }}
      ref={modalOverlay}
    >
      <div className={styles.modalContent}>
        <span className={styles.xIcon}>
          <img
            src="/x.svg"
            alt="fechar"
            onClick={() => setModalAdicionar(false)}
          />
        </span>
        <label htmlFor="fileInputAdd" className={styles.imageContent}>
          <img src="/placeholder-image.jpg" alt="Adicionar Imagem do Post" />
          <img
            src="/edit.svg"
            alt="Icone de Adicionar Imagem"
            className={styles.adicionarIcon}
          />
        </label>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="fileInputAdd"
        />
        <div className={styles.mainContent}>
          <label htmlFor="titulo" className={styles.label}>
            <p>Titulo</p>
            <input
              type="text"
              placeholder="Informe um título breve e claro..."
              id="titulo"
              value={titulo}
              onChange={(e) =>
                dispatch({ type: "titulo", payload: e.target.value })
              }
            />
          </label>
          <label htmlFor="categoria" className={styles.label}>
            <p>Categoria</p>
            <select
              name="Select"
              id="categoria"
              value={categoria}
              onChange={(e) =>
                dispatch({ type: "categoria", payload: e.target.value })
              }
            >
              <option value="" disabled={true} selected={true}>
                Escolha uma Categoria
              </option>
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
          <div className={styles.radioDiv} style={{ zIndex: 15 }}>
            <p>Urgência</p>
            <div className={styles.radios}>
              <input
                type="radio"
                name="urgencia"
                className={styles.urgencia}
                value="alta"
                checked={urgencia === "alta"}
                onChange={(e) =>
                  dispatch({ type: "urgencia", payload: e.target.value })
                }
              />
              <p>Alta</p>
              <input
                type="radio"
                name="urgencia"
                className={styles.urgencia}
                value="media"
                checked={urgencia === "media"}
                onChange={(e) =>
                  dispatch({ type: "urgencia", payload: e.target.value })
                }
              />
              <p>Média</p>
              <input
                type="radio"
                name="urgencia"
                className={styles.urgencia}
                value="baixa"
                checked={urgencia === "baixa"}
                onChange={(e) =>
                  dispatch({ type: "urgencia", payload: e.target.value })
                }
              />
              <p>Baixa</p>
            </div>
          </div>
          <label htmlFor="descricao" className={styles.label}>
            <p>Descrição</p>
            <textarea
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
          <label htmlFor="tempo" className={styles.label}>
            <p>Tempo de publicação</p>
            <select
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
          <Button customClass={styles.publicarBtn} onClick={handlePublicar}>
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
