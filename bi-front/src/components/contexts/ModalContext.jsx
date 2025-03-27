import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [modalAdicionarSolicitacao, setModalAdicionarSolicitacao] =
    useState(false);
  const [modalAdicionarRepasse, setModalAdicionarRepasse] = useState(false);
  const [modalSearch, setModalSearch] = useState(null); // recebe os dados da publicação
  const [modalImage, setModalImage] = useState(false);
  const [modalEncerrar, setModalEncerrar] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        modalAdicionarSolicitacao,
        setModalAdicionarSolicitacao,
        modalAdicionarRepasse,
        setModalAdicionarRepasse,
        modalSearch,
        setModalSearch,
        modalImage,
        setModalImage,
        modalEncerrar,
        setModalEncerrar,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ModalProvider, ModalContext };
