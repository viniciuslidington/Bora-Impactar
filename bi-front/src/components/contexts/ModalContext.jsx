import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [modalAdicionar, setModalAdicionar] = useState(false);

  return (
    <ModalContext.Provider value={{ modalAdicionar, setModalAdicionar }}>
      {children}
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ModalProvider, ModalContext };
