import { calcularTempoDesdePublicacao } from "../../utils/formatDate";
import UrgencyIcon from "../UrgencyIcon/UrgencyIcon";
import PropTypes from "prop-types";
import placeholderImg from "../../assets/placeholder-image.jpg";

export default function Posts({ data = {}, isLoading = false, onClick }) {
  const {
    createdAt,
    description,
    title,
    urgency,
    ong_Imagem,
    category,
    post_Imagem,
  } = data;

  const categorias = {
    ELETRODOMESTICOS_E_MOVEIS: "Eletrodomésticos e Móveis",
    UTENSILIOS_GERAIS: "Utensílios Gerais",
    ROUPAS_E_CALCADOS: "Roupas e Calçados",
    SAUDE_E_HIGIENE: "Saúde e Higiene",
    MATERIAIS_EDUCATIVOS_E_CULTURAIS: "Materiais Educativos e Culturais",
    ITENS_DE_INCLUSAO_E_MOBILIDADE: "Itens de Inclusão e Mobilidade",
    ELETRONICOS: "Eletrônicos",
    ITENS_PET: "Itens Pet",
    OUTROS: "Outros",
  };

  return isLoading ? (
    <div className="flex flex-1 basis-[calc(33.333%-32px)] animate-pulse cursor-pointer flex-col rounded border-2 border-[#9c9c9c] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all duration-100 hover:scale-101">
      <div className="h-[120px] animate-pulse rounded-t bg-gray-300"></div>

      <div className="relative flex flex-col gap-3 px-5 py-6">
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-300"></div>

        {urgency && (
          <UrgencyIcon
            className="absolute top-5 right-4 h-8 w-8 animate-pulse"
            urgency="isLoading"
          />
        )}

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
          <div className="h-4 w-2/5 animate-pulse rounded bg-gray-300"></div>
          <p className="animate-pulse text-[18px] text-gray-300">|</p>
          <div className="h-4 w-1/8 animate-pulse rounded bg-gray-300"></div>
        </div>

        <div className="h-9 w-[308px] animate-pulse rounded bg-gray-300"></div>
      </div>
    </div>
  ) : (
    <div
      className="flex max-w-full flex-1 basis-[calc(33.333%-32px)] cursor-pointer flex-col rounded border-2 border-[#9c9c9c] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all duration-100 hover:scale-101 lg:max-w-[352px]"
      onClick={onClick}
    >
      <img
        src={post_Imagem || placeholderImg}
        alt=""
        className="h-[120px] border-b-1 border-[#9c9c9c] object-cover"
      />
      <div className="relative flex flex-col gap-2 p-5">
        <h3 className="max-w-[calc(100%-32px)] truncate text-[20px] font-bold">
          {title}
        </h3>
        {urgency && (
          <UrgencyIcon
            className={"absolute right-4 h-8 w-8"}
            urgency={urgency}
          />
        )}
        <span className="flex items-center gap-2">
          <img
            src={
              ong_Imagem || ong_Imagem !== "undefined"
                ? ong_Imagem
                : placeholderImg
            }
            alt=""
            className="h-8 w-8 rounded-[50%] border border-[#9c9c9c81] object-cover"
          />
          <p className="text-[14px]">{categorias[category]}</p>
          <p>|</p>
          <p>{calcularTempoDesdePublicacao(createdAt)}</p>
        </span>
        <p
          className="w-full overflow-hidden text-[14px] break-words text-ellipsis opacity-70 lg:w-[308px]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

Posts.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};
