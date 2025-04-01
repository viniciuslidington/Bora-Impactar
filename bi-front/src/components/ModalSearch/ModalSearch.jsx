import { useContext, useRef } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { calcularTempoRestante, formatarData } from "../../utils/formatDate";
import { formatarNumeroTelefone } from "../../utils/formatString";
import PropTypes from "prop-types";

export default function ModalSearch({ solicitacao = false }) {
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
    post_Imagem,
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
      className="fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.25)] px-4 lg:px-0"
      onClick={(e) => {
        modalOverlay.current === e.target && setModalSearch(null);
      }}
      ref={modalOverlay}
    >
      <div className="relative z-11 flex h-[90vh] w-full max-w-full flex-col items-center gap-4 rounded bg-white p-4 lg:h-auto lg:max-w-[1120px] lg:flex-row lg:flex-wrap lg:items-start lg:gap-6 lg:p-8">
        <div className="flex w-full items-center gap-2 lg:relative">
          <img
            src={ong_Imagem || "/placeholder-image.jpg"}
            alt="Foto de perfil"
            className="h-12 w-12 rounded-full border-1 border-[#9c9c9c81] object-cover lg:h-16 lg:w-16"
          />{" "}
          <p className="line-clamp-1 w-[calc(55%-48px)] lg:w-auto">
            {ong_Nome}
          </p>
          <span>|</span>
          <p className="flex gap-1">
            <span className="hidden lg:flex">Publicado: </span> {dataPublicacao}
          </p>
          <img
            src="/x.svg"
            alt="fechar"
            className="absolute top-7 right-4 h-6 w-6 cursor-pointer lg:top-0 lg:right-0 lg:h-5 lg:w-5"
            onClick={() => setModalSearch(null)}
          />
        </div>
        <img
          src={post_Imagem || "/placeholder-image.jpg"}
          alt="Imagem da publicação"
          className="h-[264px] w-full rounded border border-[#9c9c9c81] object-cover lg:h-[336px] lg:w-[336px]"
        />
        <div className="flex h-full w-full max-w-full flex-col justify-start gap-4 lg:h-[336px] lg:max-w-[calc(100%-360px)] lg:gap-5">
          <p className="max-w-full text-3xl font-semibold break-words opacity-95">
            {title}
          </p>
          <span className="flex flex-row flex-wrap items-center gap-2 opacity-95 lg:flex-nowrap">
            <p className="rounded bg-[#eaeaea] p-1 text-sm lg:bg-transparent lg:p-0 lg:text-base">
              {categorias[category]}
            </p>
            <span>|</span>
            {solicitacao && (
              <>
                <p
                  className={`rounded bg-[#eaeaea] p-1 text-sm lg:bg-transparent lg:p-0 lg:text-base`}
                >
                  {urgencia[urgency]}
                </p>
                <span>|</span>
              </>
            )}
            <p className="max-w-full rounded bg-[#eaeaea] p-1 text-sm lg:bg-transparent lg:p-0 lg:text-base">
              {dataExpiracao} para expirar
            </p>
          </span>
          <div className="relative h-full max-h-full max-w-full">
            <p className="h-full max-h-full max-w-full overflow-scroll break-words whitespace-normal opacity-70 lg:max-h-[196px] lg:overflow-auto">
              {description}
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-4 gap-y-2">
            <span className="flex items-center gap-1 opacity-80">
              <svg viewBox="0 0 20 16" className="h-4 w-5">
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M2 16C1.45 16 0.975 15.8083 0.575 15.425C0.191667 15.025 0 14.55 0 14V2C0 1.45 0.191667 0.983334 0.575 0.599999C0.975 0.2 1.45 0 2 0H18C18.55 0 19.0167 0.2 19.4 0.599999C19.8 0.983334 20 1.45 20 2V14C20 14.55 19.8 15.025 19.4 15.425C19.0167 15.8083 18.55 16 18 16H2ZM10 9L18 4V2L10 7L2 2V4L10 9Z"
                  fill="#232323"
                />
              </svg>
              <p className="font-semibold">{ong_Email}</p>
            </span>
            <span className="flex items-center gap-1 opacity-80">
              <svg viewBox="0 0 20 20" className="h-5 w-5">
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M7.38515 18.9152C6.47008 19.5057 5.37964 19.7629 4.29718 19.6438C3.21472 19.5248 2.20627 19.0367 1.4414 18.2615L0.772723 17.6077C0.47957 17.3078 0.31543 16.9051 0.31543 16.4858C0.31543 16.0664 0.47957 15.6637 0.772723 15.3638L3.61087 12.5554C3.90821 12.2632 4.30842 12.0995 4.72532 12.0995C5.14222 12.0995 5.54244 12.2632 5.83978 12.5554C6.13964 12.8486 6.54232 13.0127 6.96167 13.0127C7.38101 13.0127 7.7837 12.8486 8.08355 12.5554L12.5414 8.09762C12.6901 7.95108 12.8082 7.77642 12.8888 7.58382C12.9694 7.39122 13.0109 7.18452 13.0109 6.97573C13.0109 6.76695 12.9694 6.56025 12.8888 6.36765C12.8082 6.17505 12.6901 6.0004 12.5414 5.85385C12.2492 5.5565 12.0854 5.15629 12.0854 4.73939C12.0854 4.3225 12.2492 3.92228 12.5414 3.62493L15.3646 0.801653C15.6645 0.5085 16.0672 0.34436 16.4866 0.34436C16.9059 0.34436 17.3086 0.5085 17.6085 0.801653L18.2622 1.47033C19.0373 2.2352 19.5255 3.24365 19.6446 4.3261C19.7636 5.40856 19.5065 6.499 18.916 7.41409C15.84 11.9473 11.9263 15.8509 7.38515 18.9152Z"
                  fill="#232323"
                />
              </svg>
              <p className="font-semibold">
                {formatarNumeroTelefone(ong_Phone)}
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

ModalSearch.propTypes = {
  solicitacao: PropTypes.bool,
};
