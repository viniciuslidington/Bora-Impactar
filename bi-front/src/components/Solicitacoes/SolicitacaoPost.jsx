import PropTypes from "prop-types";
import Button from "../Button/Button";
import styles from "./post.module.css";
import PostSelected from "./SolicitacaoEditar";
import { formatarData, calcularTempoRestante } from "../../utils/formatDate";

export default function Post({ selected, post, handleEditar, setSelectedId }) {
  const dataPublicacao = new Date(post.createdAt);
  const dataExpiracao = new Date(post.expirationDate);

  const publicacaoFormatada = formatarData(dataPublicacao);
  const expiracaoFormatada = calcularTempoRestante(dataExpiracao);

  const postExpirado =
    expiracaoFormatada === "Postagem Expirada" ? true : false;

  return selected ? (
    <PostSelected
      publicacaoFormatada={publicacaoFormatada}
      expiracaoFormatada={expiracaoFormatada}
      setSelectedId={setSelectedId}
      post={post}
    />
  ) : (
    <div
      className={styles.post}
      style={postExpirado ? { pointerEvents: "none", opacity: 0.5 } : null}
    >
      <img
        src={post.post_Imagem || "/placeholder-image.jpg"}
        alt="Imagem do Post"
      />
      <p className={styles.title}>{post.title}</p>
      <span>|</span>
      <p className={styles.dataPublicado}>Publicado: {publicacaoFormatada}</p>
      <span>|</span>
      <p className={styles.dataExpiracao}>{expiracaoFormatada}</p>
      <div className={styles.postBtns}>
        <Button
          addClassName="py-[12px] px-[32px] bg-[#009fe3]! hover:bg-[#43bef3]!"
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
};
