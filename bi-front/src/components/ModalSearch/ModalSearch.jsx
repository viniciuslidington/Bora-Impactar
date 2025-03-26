import { useContext, useRef } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { calcularTempoRestante, formatarData } from "../../utils/formatDate";

export default function ModalSearch() {
  const { modalSearch, setModalSearch } = useContext(ModalContext);
  const modalOverlay = useRef();

  const {
    title,
    category,
    description,
    urgency,
    ong_Nome,
    ong_Phone,
    ong_Imagem,
    ong_Email,
    createdAt,
    expirationDate,
  } = modalSearch;

  const dataPublicacao = formatarData(new Date(createdAt));
  const dataExpiracao = calcularTempoRestante(new Date(expirationDate));

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

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
      onClick={(e) => {
        modalOverlay.current === e.target && setModalSearch(false);
      }}
      ref={modalOverlay}
    >
      <div className="relative z-11 flex w-full max-w-[1120px] flex-wrap gap-6 rounded bg-white p-8">
        <div className="flex w-full items-center gap-2">
          <img
            src={ong_Imagem ?? "/placeholder-image.jpg"}
            alt="Foto de perfil"
            className="h-16 w-16 rounded-full border-1 border-[#9c9c9c] object-cover"
          />{" "}
          <p>{ong_Nome}</p>
          <span>|</span>
          <p>Publicado: {dataPublicacao}</p>
        </div>
        <img
          src="/placeholder-image.jpg"
          alt="Imagem da publicação"
          className="h-[336px] w-[336px] rounded border border-[#9c9c9c] object-cover"
        />
        <div className="flex h-[336px] max-w-[calc(100%-360px)] flex-col justify-start gap-5">
          <p className="text-3xl font-semibold">{title}</p>
          <span className="flex gap-2">
            <p>{categorias[category]}</p>
            <span>|</span>
            <p>{urgencia[urgency]}</p>
            <span>|</span>
            <p className="max-w-full">{dataExpiracao}</p>
          </span>
          <p className="opacity-70">{description}</p>
        </div>
      </div>
    </div>
  );
}
