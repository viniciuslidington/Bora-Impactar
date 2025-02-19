import PropTypes from "prop-types";
import Button from "../Button/Button";
import styles from "./post.module.css";

export default function Post({ selected, post }) {
  const dataPublicacao = new Date(post.dataPublicacao);
  const dataExpiracao = new Date(post.dataExpiracao);

  const publicacaoFormatada = formatarData(dataPublicacao);
  const expiracaoFormatada = calcularTempoRestante(dataExpiracao);

  const postExpirado = expiracaoFormatada === "Post Expirado!" ? true : false;

  return (
    <div
      className={styles.post}
      style={postExpirado ? { pointerEvents: "none", opacity: 0.5 } : null}
    >
      <img src="/placeholder-image.jpg" alt="postImage" />
      <p className={styles.title}>{post.titulo}</p>
      <span>|</span>
      <p>Publicado: {publicacaoFormatada}</p>
      <span>|</span>
      <p>{expiracaoFormatada}</p>
      <div className={styles.postBtns}>
        <Button customClass={styles.encerrarBtn}>Encerrar Solicitação</Button>
        <Button customClass={styles.editarBtn}>Editar</Button>
      </div>
    </div>
  );
}

Post.propTypes = {
  selected: PropTypes.bool,
  post: PropTypes.object,
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
