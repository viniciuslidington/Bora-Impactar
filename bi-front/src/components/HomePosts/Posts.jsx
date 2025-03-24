import { calcularTempoDesdePublicacao } from "../../utils/formatDate";
import UrgencyIcon from "../UrgencyIcon/UrgencyIcon";
import PropTypes from "prop-types";

export default function Posts({ data }) {
  const { createdAt, description, title, urgency, ong_Imagem } = data;

  return (
    <div className="flex flex-1 basis-[calc(33.333%-32px)] cursor-pointer flex-col rounded border-2 border-[#9c9c9c] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all duration-100 hover:scale-101">
      <img
        src="/placeholder-image.jpg"
        alt=""
        className="h-[120px] border-b-1 border-[#9c9c9c] object-cover"
      />
      <div className="relative flex flex-col gap-2 p-5">
        <h3 className="text-[20px] font-bold">{title}</h3>
        <UrgencyIcon className={"absolute right-4 h-8 w-8"} urgency={urgency} />
        <span className="flex items-center gap-2">
          <img
            src={ong_Imagem ?? "/placeholder-image.jpg"}
            alt=""
            className="h-8 w-8 rounded-[50%] border border-[#9c9c9c] object-cover"
          />
          <p className="text-[14px]">{title}</p>
          <p>|</p>
          <p>{calcularTempoDesdePublicacao(createdAt)}</p>
        </span>
        <p
          className="w-[308px] overflow-hidden text-[14px] break-words text-ellipsis opacity-70"
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
};
