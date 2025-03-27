import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { ModalContext } from "../contexts/ModalContext";
import Button from "../Button/Button";

export default function ModalConfirm({
  colorRed = true,
  content1 = "Cancelar",
  content2 = "Confirmar",
  onClick1,
  onClick2,
  placeholder,
  xIcon = false,
}) {
  const modalOverlay = useRef();

  const { setModalConfirm } = useContext(ModalContext);

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
      onClick={(e) => {
        modalOverlay.current === e.target && setModalConfirm(null);
      }}
      ref={modalOverlay}
    >
      <div className="relative z-21 flex flex-col gap-6 rounded bg-white p-10">
        {xIcon && (
          <img
            src="/x.svg"
            alt=""
            className="absolute top-3 right-3 h-5 w-5 cursor-pointer"
            onClick={() => setModalConfirm(false)}
          />
        )}
        {placeholder && (
          <p className="max-w-[380px] opacity-90">{placeholder}</p>
        )}
        <span className="flex gap-5">
          <Button
            className={`h-12 w-[180px] cursor-pointer rounded border-2 ${colorRed ? "border-red-400 text-red-400" : "border-[#294bb6] text-[#294bb6]"} shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] transition-all duration-100 ${colorRed ? "hover:bg-red-100" : "hover:bg-[#294ab613]"}`}
            onClick={onClick1}
          >
            {content1}
          </Button>
          <Button
            onClick={onClick2}
            className={`h-12 w-[180px] cursor-pointer rounded-sm ${colorRed ? "border-2 border-red-400 bg-red-400" : "border-none bg-[#294bb6]"} px-2 text-base font-medium text-white ${colorRed ? "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)]" : "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"} transition-all duration-100 ease-in hover:${colorRed ? "bg-red-300" : "bg-[#335fee]"} disabled:opacity-70`}
          >
            {content2}
          </Button>
        </span>
      </div>
    </div>
  );
}

ModalConfirm.propTypes = {
  colorRed: PropTypes.string,
  content1: PropTypes.string,
  content2: PropTypes.string,
  onClick1: PropTypes.func,
  onClick2: PropTypes.func,
  placeholder: PropTypes.string,
  xIcon: PropTypes.bool,
};
