import PropTypes from "prop-types";
import Button from "../Button/Button";
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
      className="relative flex w-full items-center gap-4 rounded bg-white p-2"
      style={postExpirado ? { pointerEvents: "none", opacity: 0.5 } : null}
    >
      <img
        src={post.post_Imagem || "/placeholder-image.jpg"}
        alt="Imagem do Post"
        className="mr-2 h-13 w-18 rounded border border-[#eaeaea] object-cover object-center"
      />
      <p className="w-[224px] overflow-hidden text-ellipsis whitespace-nowrap">
        {post.title}
      </p>
      <span>|</span>
      <p className="w-[156px]">Publicado: {publicacaoFormatada}</p>
      <span>|</span>
      <p className="w-auto">{expiracaoFormatada}</p>
      <div className="absolute right-2 flex gap-4">
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
