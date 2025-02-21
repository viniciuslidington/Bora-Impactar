import { useContext, useRef } from "react";
import { ModalContext } from "../contexts/ModalContext";
import Button from "../Button/Button";
import styles from "./modalAdicionar.module.css";

export default function ModaAdicionar() {
  const { modalAdicionar, setModalAdicionar } = useContext(ModalContext);
  const modalOverlay = useRef();

  if (modalAdicionar) {
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
          <label htmlFor="fileInput" className={styles.imageContent}>
            <img src="/placeholder-image.jpg" alt="Adicionar Imagem do Post" />
            <img
              src="/edit.svg"
              alt="Icone de Adicionar Imagem"
              className={styles.adicionarIcon}
            />
          </label>
          <div className={styles.mainContent}>
            <label htmlFor="titulo" className={styles.label}>
              <p>Titulo</p>
              <input
                type="text"
                placeholder="Informe um título breve e claro..."
                id="titulo"
              />
            </label>
            <label htmlFor="categoria" className={styles.label}>
              <p>Categoria</p>
              <select name="Select" id="categoria">
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
            <label className={styles.label}>
              <p>Urgência</p>
              <div className={styles.radios}>
                <input
                  type="radio"
                  name="urgencia"
                  className={styles.urgencia}
                  value="alta"
                />
                <p>Alta</p>
                <input
                  type="radio"
                  name="urgencia"
                  className={styles.urgencia}
                  value="media"
                />
                <p>Média</p>
                <input
                  type="radio"
                  name="urgencia"
                  className={styles.urgencia}
                  value="baixa"
                />
                <p>Baixa</p>
              </div>
            </label>
            <label htmlFor="descricao" className={styles.label}>
              <p>Descrição</p>
              <textarea
                rows="8"
                type="text"
                placeholder="Informe uma descrição completa e clara..."
                id="descricao"
              />
            </label>
            <label htmlFor="tempo" className={styles.label}>
              <p>Tempo de publicação</p>
              <select name="tempo-de-publicacao" id="tempo">
                <option value="" selected={true} disabled={true}>
                  Selecionar
                </option>
                <option value="7">7 dias</option>
                <option value="14">14 dias</option>
                <option value="30">30 dias</option>
                <option value="90">90 dias</option>
              </select>
            </label>
            <Button customClass={styles.publicarBtn}>Publicar</Button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
