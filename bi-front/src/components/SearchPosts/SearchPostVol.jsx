import PropTypes from "prop-types";
import { calcularTempoRestante, formatarData } from "../../utils/formatDate";
import UrgencyIcon from "../UrgencyIcon/UrgencyIcon";
import { useContext, useEffect } from "react";
import { ModalContext } from "../contexts/ModalContext";
import placeholderImg from "../../assets/placeholder-image.jpg";

export default function SearchPostVol({ data = {}, isLoading = false }) {
  const {
    category,
    createdAt,
    description,
    title,
    urgency,
    expirationDate,
    ong_Nome,
    ong_Imagem,
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

  const urgencia = {
    HIGH: "Urgência Alta",
    MEDIUM: "Urgência Média",
    LOW: "Urgência Baixa",
  };

  const { setModalSearch } = useContext(ModalContext);

  useEffect(() => {
    return setModalSearch(null);
  }, [setModalSearch]);

  return isLoading ? (
    <div className="flex w-[768px] animate-pulse cursor-pointer flex-wrap gap-2 rounded-sm border-2 border-[#9C9C9C] bg-white p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all duration-200 ease-in-out hover:scale-101">
      <div className="relative flex w-full items-center gap-2">
        <div className="h-14 w-14 animate-pulse rounded-[50%] bg-gray-300"></div>
        <div className="h-5 w-24 animate-pulse rounded bg-gray-300"></div>
        <p className="animate-pulse text-[20px] text-gray-300">|</p>
        <div className="h-5 w-38 animate-pulse rounded bg-gray-300"></div>
        <UrgencyIcon
          urgency={"isLoading"}
          className={"absolute right-0 h-8 w-8 animate-pulse"}
        />
      </div>

      <div className="flex w-[556px] flex-col justify-center gap-4">
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-1/5 animate-pulse rounded bg-gray-300"></div>
          <p className="animate-pulse text-[20px] text-gray-300">|</p>
          <div className="h-4 w-1/5 animate-pulse rounded bg-gray-300"></div>
          <p className="animate-pulse text-[20px] text-gray-300">|</p>
          <div className="h-4 w-1/5 animate-pulse rounded bg-gray-300"></div>
        </div>
        <div className="h-9 w-full animate-pulse rounded bg-gray-300"></div>
      </div>

      {/* Imagem adicional - Skeleton */}
      <div className="ml-auto h-[164px] w-[164px] animate-pulse rounded-sm bg-gray-300"></div>
    </div>
  ) : (
    <div
      className="flex w-[768px] cursor-pointer flex-wrap gap-2 rounded-sm border-2 border-[#9C9C9C] bg-white p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all duration-200 ease-in-out hover:scale-101"
      style={
        expirationDate &&
        calcularTempoRestante(expirationDate) === "Postagem Expirada"
          ? {
              pointerEvents: "none",
              opacity: 0.7,
            }
          : {}
      }
      onClick={() => setModalSearch(data)}
    >
      <div className="relative flex w-full items-center gap-2">
        <img
          src={
            ong_Imagem === "undefined" || ong_Imagem === undefined
              ? placeholderImg
              : ong_Imagem
          }
          alt=""
          className="h-14 w-14 rounded-[50%] border border-[#9c9c9c81] object-cover"
        />
        <p className="opacity-95">{ong_Nome}</p>
        <span className="opacity-95">|</span>
        <p className="opacity-95">
          Publicado: {formatarData(new Date(createdAt))}
        </p>
        <UrgencyIcon urgency={urgency} className={"absolute right-0 h-8 w-8"} />
      </div>
      <div className="flex w-[556px] flex-col justify-center gap-4">
        <h3 className="max-w-full overflow-hidden text-2xl font-semibold text-ellipsis opacity-95">
          {title}
        </h3>
        <div className="flex gap-2">
          <p className="opacity-95">{categorias[category]}</p>
          <span className="opacity-95">|</span>
          <p className="opacity-95">{urgencia[urgency]}</p>
          <span className="opacity-95">|</span>
          <p className="opacity-95">
            {expirationDate
              ? calcularTempoRestante(new Date(expirationDate))
              : "Sem data de Expiração"}
          </p>
        </div>
        <p
          className="w-full overflow-hidden break-words text-ellipsis opacity-70"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
      </div>
      <img
        src={post_Imagem || placeholderImg}
        alt=""
        className="ml-auto h-[164px] w-[164px] rounded-sm border border-[#9c9c9c81] object-cover"
      />
    </div>
  );
}

SearchPostVol.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
