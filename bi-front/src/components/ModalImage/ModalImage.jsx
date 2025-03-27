import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { ModalContext } from "../contexts/ModalContext";
import Button from "../Button/Button";

export default function ModalImage({
  content1 = "Cancelar",
  content2 = "Confirmar",
  onClick1,
  onClick2,
  placeholder,
  xIcon = false,
}) {
  const modalOverlay = useRef();

  const { setModalImage } = useContext(ModalContext);

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
      onClick={(e) => {
        modalOverlay.current === e.target && setModalImage(null);
      }}
      ref={modalOverlay}
    >
      <div className="relative z-21 flex flex-col gap-6 rounded bg-white p-10">
        {xIcon && (
          <img
            src="/x.svg"
            alt=""
            className="absolute top-3 right-3 h-5 w-5 cursor-pointer"
            onClick={() => setModalImage(false)}
          />
        )}
        {placeholder && (
          <p className="max-w-[380px] opacity-90">{placeholder}</p>
        )}
        <span className="flex gap-5">
          <Button
            className={
              "h-12 w-[180px] cursor-pointer rounded border-2 border-[#294bb6] text-[#294bb6] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] transition-all duration-100 hover:bg-[#294ab613]"
            }
            onClick={onClick1}
          >
            {content1}
          </Button>
          <Button
            onClick={onClick2}
            className={
              "h-12 w-[180px] cursor-pointer rounded-sm border-none bg-[#294bb6] px-2 text-base font-medium text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#335fee] disabled:opacity-70"
            }
          >
            {content2}
          </Button>
        </span>
      </div>
    </div>
  );
}

ModalImage.propTypes = {
  content1: PropTypes.string,
  content2: PropTypes.string,
  onClick1: PropTypes.func,
  onClick2: PropTypes.func,
  placeholder: PropTypes.string,
  xIcon: PropTypes.bool,
};
