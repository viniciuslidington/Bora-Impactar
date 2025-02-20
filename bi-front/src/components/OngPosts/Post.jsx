import PropTypes from "prop-types";
import Button from "../Button/Button";
import styles from "./post.module.css";

export default function Post({ selected = false, post, handleEditar }) {
  const dataPublicacao = new Date(post.dataPublicacao);
  const dataExpiracao = new Date(post.dataExpiracao);

  const publicacaoFormatada = formatarData(dataPublicacao);
  const expiracaoFormatada = calcularTempoRestante(dataExpiracao);

  const postExpirado = expiracaoFormatada === "Post Expirado!" ? true : false;

  return selected ? (
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
        <span className={styles.xSelected}>
          <img src="/x.svg" alt="x" />
        </span>
        <label htmlFor="tituloSelected" className={styles.labelSelected}>
          <p>Titulo</p>
          <input
            type="text"
            placeholder="Informe um título breve e claro..."
            id="tituloSelected"
          />
        </label>
        <label htmlFor="categoriaSelected" className={styles.labelSelected}>
          <p>Categoria</p>
          <select name="editSelect" id="categoriaSelected" value="alimentos">
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
            />
            <p>Alta</p>
            <input
              type="radio"
              name="urgenciaSelected"
              className={styles.urgenciaSelected}
              value="media"
            />
            <p>Média</p>
            <input
              type="radio"
              name="urgenciaSelected"
              className={styles.urgenciaSelected}
              value="baixa"
            />
            <p>Baixa</p>
          </div>
        </label>
        <div className={styles.divEncerrarBtn}>
          <p>{expiracaoFormatada}</p>
          <Button customClass={styles.encerrarBtn}>Encerrar Solicitação</Button>
        </div>
      </div>
      <label htmlFor="tituloSelected" className={styles.labelSelected}>
        <p>Descrição</p>
        <textarea
          rows="7"
          type="text"
          placeholder="Informe um título breve e claro..."
          id="tituloSelected"
        />
      </label>
      <div className={styles.divSalvarBtn}>
        <p></p>
        <Button customClass={styles.salvarBtn}>Salvar Alterações</Button>
      </div>
    </form>
  ) : (
    <div
      className={styles.post}
      style={postExpirado ? { pointerEvents: "none", opacity: 0.5 } : null}
    >
      <img src="/placeholder-image.jpg" alt="Imagem do Post" />
      <p className={styles.title}>{post.titulo}</p>
      <span>|</span>
      <p>Publicado: {publicacaoFormatada}</p>
      <span>|</span>
      <p>{expiracaoFormatada}</p>
      <div className={styles.postBtns}>
        <Button customClass={styles.encerrarBtn}>Encerrar Solicitação</Button>
        <Button
          customClass={styles.editarBtn}
          onClick={() => handleEditar(post.id)}
        >
          Editar
        </Button>
      </div>
    </div>
  );
}

Post.propTypes = {
  selected: PropTypes.bool,
  post: PropTypes.object,
  handleEditar: PropTypes.func,
};

function calcularTempoRestante(dataExpiracao) {
  const dataAtual = new Date();
  const diferencaEmMilissegundos = dataExpiracao - dataAtual;
  const umDia = 24 * 60 * 60 * 1000; // Milissegundos em um dia
  const umaHora = 60 * 60 * 1000; // Milissegundos em uma hora

  if (diferencaEmMilissegundos < 0) {
    return "Post Expirado!"; //Se passou da data de expiração
  }

  const diasRestantes = Math.floor(diferencaEmMilissegundos / umDia);
  const horasRestantes = Math.floor(
    (diferencaEmMilissegundos % umDia) / umaHora
  );

  let resposta = null;
  if (horasRestantes !== 0 && diasRestantes !== 0) {
    resposta = `Tempo restante: ${diasRestantes} dias e ${horasRestantes} horas`;
  } else if (horasRestantes == 0 && diasRestantes !== 0) {
    resposta = `Tempo restante: ${diasRestantes}`;
  } else if (horasRestantes !== 0 && diasRestantes == 0) {
    resposta = `Tempo restante: ${horasRestantes} horas`;
  }

  return resposta;
}

function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro é 0!
  const ano = String(data.getFullYear()).slice(-2); // Pega os últimos 2 dígitos do ano
  return `${dia}/${mes}/${ano}`;
}
