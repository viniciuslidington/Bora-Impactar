import { useContext, useRef } from "react";
import { ModalContext } from "../contexts/ModalContext";

export default function ModalSearch() {
  const { ModalSearch } = useContext(ModalContext);
  const modalOverlay = useRef();

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
      onClick={(e) => {
        modalOverlay.current === e.target && setModalSearch(false);
      }}
      ref={modalOverlay}
    >
      <div className="relative z-11 flex w-full max-w-[1120px] items-start gap-6 rounded bg-white p-8"></div>
    </div>
  );
}
