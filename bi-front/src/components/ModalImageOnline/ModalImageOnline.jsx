import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { ModalContext } from "../contexts/ModalContext";
import xImg from "../../assets/x.svg";

export default function ModalImageOnline({ handleImageChange }) {
  const modalOverlay = useRef();

  const { setModalImageOnline } = useContext(ModalContext);

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
      onClick={(e) => {
        modalOverlay.current === e.target && setModalImageOnline(null);
      }}
      ref={modalOverlay}
    >
      <div className="relative z-21 flex flex-col gap-6 rounded bg-white p-10">
        <img
          src={xImg}
          alt=""
          className="absolute top-3 right-3 h-5 w-5 cursor-pointer"
          onClick={() => setModalImageOnline(false)}
        />
      </div>
    </div>
  );
}

ModalImageOnline.propTypes = {
  handleImageChange: PropTypes.func,
};
