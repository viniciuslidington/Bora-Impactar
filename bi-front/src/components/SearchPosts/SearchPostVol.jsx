import PropTypes from "prop-types";
import { formatarData } from "../../utils/formatDate";
import UrgencyIcon from "../UrgencyIcon/UrgencyIcon";

export default function SearchPostVol({ data }) {
  const { category, createdAt, description, title, urgency } = data;

  const urgencia = {
    HIGH: "Urgência Alta",
    MEDIUM: "Urgência Média",
    LOW: "Urgência Baixa",
  };

  return (
    <div className="flex w-[768px] cursor-pointer flex-wrap gap-2 rounded-sm border-2 border-[#9C9C9C] bg-white p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all duration-200 ease-in-out hover:scale-101">
      <div className="relative flex w-full items-center gap-2">
        <img
          src="/placeholder-image.jpg"
          alt=""
          className="h-14 w-14 rounded-[50%] border border-[#9C9C9C] object-contain"
        />
        <p className="opacity-95">Ong_name</p>
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
          <p className="opacity-95">{category}</p>
          <span className="opacity-95">|</span>
          <p className="opacity-95">{urgencia[urgency]}</p>
          <span className="opacity-95">|</span>
          <p className="opacity-95">Tempo restatante: 7 dias e 4 horas</p>
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
        src="/placeholder-image.jpg"
        alt=""
        className="ml-auto h-[164px] w-[164px] rounded-sm border border-[#9C9C9C] object-contain"
      />
    </div>
  );
}

SearchPostVol.propTypes = {
  data: PropTypes.object.isRequired,
};
