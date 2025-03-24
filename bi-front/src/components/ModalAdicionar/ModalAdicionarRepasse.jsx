import { useContext, useRef, useReducer } from "react";
import toast from "react-hot-toast";
import { ModalContext } from "../contexts/ModalContext";
import Button from "../Button/Button";
import styles from "./modalAdicionar.module.css";
import { useUserData } from "../../services/authService";
import { useAddRepasse } from "../../services/userRepasseService";

export default function ModaAdicionar() {
  const { mutate: adicionar } = useAddRepasse();
  const { data } = useUserData();

  const initialState = {
    titulo: "",
    categoria: "",
    urgencia: "",
    descricao: "",
    tempo: "",
    imageUrl: "/placeholder-image.jpg",
  };

  const { setModalAdicionarRepasse } = useContext(ModalContext);
  const modalOverlay = useRef();

  const [{ titulo, categoria, urgencia, descricao, tempo }, dispatch] =
    useReducer(reduce, initialState);

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
      description: descricao,
      ong_Id: data?.userData.ngo.id,
      ong_Nome: data?.userData.ngo.name,
      expirationDuration: tempo,
    });
    setModalAdicionarRepasse(false);
  }

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        modalOverlay.current === e.target && setModalAdicionarRepasse(false);
      }}
      ref={modalOverlay}
    >
      <div className={styles.modalContent}>
        <span className={styles.xIcon}>
          <img
            src="/x.svg"
            alt="fechar"
            onClick={() => setModalAdicionarRepasse(false)}
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
              name="editSelect"
              id="categoriaSelected"
              value={categoria}
              onChange={(e) =>
                dispatch({ type: "categoria", payload: `${e.target.value}` })
              }
            >
              <option value="" disabled={true} selected={true}>
                Selecionar
              </option>
              <option value="ELETRODOMESTICOS_E_MOVEIS">
                Eletrodomésticos e Móveis
              </option>
              <option value="UTENSILIOS_GERAIS">Utensílios Gerais</option>
              <option value="ROUPAS_E_CALCADOS">Roupas e Calçados</option>
              <option value="SAUDE_E_HIGIENE">Saúde e Higiene</option>
              <option value="MATERIAIS_EDUCATIVOS_E_CULTURAIS">
                Materiais Educativos e Culturais
              </option>
              <option value="ITENS_DE_INCLUSAO_E_MOBILIDADE">
                Itens de Inclusão e Mobilidade
              </option>
              <option value="ELETRONICOS">Eletrônicos</option>
              <option value="ITENS_PET">Itens para Pets</option>
              <option value="OUTROS">Outros</option>
            </select>
          </label>
          <div className={styles.radioDiv} style={{ zIndex: 15 }}>
            <p>Urgência</p>
            <div className={styles.radios}>
              <input
                type="radio"
                name="urgencia"
                className={styles.urgencia}
                value="HIGH"
                checked={urgencia === "HIGH"}
                onChange={(e) =>
                  dispatch({ type: "urgencia", payload: e.target.value })
                }
              />
              <p>Alta</p>
              <input
                type="radio"
                name="urgencia"
                className={styles.urgencia}
                value="MEDIUM"
                checked={urgencia === "MEDIUM"}
                onChange={(e) =>
                  dispatch({ type: "urgencia", payload: e.target.value })
                }
              />
              <p>Média</p>
              <input
                type="radio"
                name="urgencia"
                className={styles.urgencia}
                value="LOW"
                checked={urgencia === "LOW"}
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
              <option value="7 dias">7 dias</option>
              <option value="2 semanas">14 dias</option>
              <option value="4 semanas">30 dias</option>
              <option value="12 semanas">90 dias</option>
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
