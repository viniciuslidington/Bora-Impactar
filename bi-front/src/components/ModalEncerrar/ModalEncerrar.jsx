import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { ModalContext } from "../contexts/ModalContext";
import Button from "../Button/Button";
import xImg from "../../assets/x.svg";

export default function ModalEncerrar({
  content1 = "Cancelar",
  content2 = "Confirmar",
  onClick,
  placeholder,
  xIcon = false,
}) {
  const modalOverlay = useRef();

  const { setModalEncerrar } = useContext(ModalContext);

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(0,0,0,0.25)] p-2"
      onClick={(e) => {
        modalOverlay.current === e.target && setModalEncerrar(null);
      }}
      ref={modalOverlay}
    >
      <div className="relative z-21 flex w-full max-w-full flex-col gap-6 rounded bg-white px-4 py-8 lg:w-auto lg:p-10">
        {xIcon && (
          <img
            src={xImg}
            alt=""
            className="absolute top-3 right-3 h-5 w-5 cursor-pointer"
            onClick={() => setModalEncerrar(false)}
          />
        )}
        {placeholder && (
          <p className="max-w-[380px] opacity-90">{placeholder}</p>
        )}
        <span className="flex gap-4 lg:gap-5">
          <Button
            className={
              "h-12 w-[calc(50%-8px)] cursor-pointer rounded border-2 border-red-400 text-red-400 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] transition-all duration-100 hover:bg-red-100 lg:w-[180px]"
            }
            onClick={() => setModalEncerrar(false)}
          >
            {content1}
          </Button>
          <Button
            onClick={onClick}
            className={
              "h-12 w-[calc(50%-8px)] cursor-pointer rounded-sm border-2 border-red-400 bg-red-400 px-2 text-base font-medium text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] transition-all duration-100 ease-in hover:bg-red-300 disabled:opacity-70 lg:w-[180px]"
            }
          >
            {content2}
          </Button>
        </span>
      </div>
    </div>
  );
}

ModalEncerrar.propTypes = {
  content1: PropTypes.string,
  content2: PropTypes.string,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  xIcon: PropTypes.bool,
};
