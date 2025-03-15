import PropTypes from "prop-types";
import Button from "../Button/Button";
import styles from "./post.module.css";
import PostSelected from "./PostSelected";
import { formatarData, calcularTempoRestante } from "../../utils/formatDate";

export default function Post({
  selected,
  post,
  handleEditar,
  setSelectedId,
  setDatabaseState,
  databaseState,
}) {
  const dataPublicacao = new Date(post.dataPublicacao);
  const dataExpiracao = new Date(post.dataExpiracao);

  const publicacaoFormatada = formatarData(dataPublicacao);
  const expiracaoFormatada = calcularTempoRestante(dataExpiracao);

  const postExpirado = expiracaoFormatada === "Post Expirado!" ? true : false;

  return selected ? (
    <PostSelected
      publicacaoFormatada={publicacaoFormatada}
      expiracaoFormatada={expiracaoFormatada}
      setSelectedId={setSelectedId}
      post={post}
      setDatabaseState={setDatabaseState}
      databaseState={databaseState}
    />
  ) : (
    <div
      className={styles.post}
      style={postExpirado ? { pointerEvents: "none", opacity: 0.5 } : null}
    >
      <img src="/placeholder-image.jpg" alt="Imagem do Post" />
      <p className={styles.title}>{post.titulo}</p>
      <span>|</span>
      <p className={styles.dataPublicado}>Publicado: {publicacaoFormatada}</p>
      <span>|</span>
      <p className={styles.dataExpiracao}>{expiracaoFormatada}</p>
      <div className={styles.postBtns}>
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
  selected: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
  handleEditar: PropTypes.func.isRequired,
  setSelectedId: PropTypes.node.isRequired,
  databaseState: PropTypes.array.isRequired,
  setDatabaseState: PropTypes.func.isRequired,
};
