import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [modalAdicionarSolicitacao, setModalAdicionarSolicitacao] =
    useState(false);
  const [modalAdicionarRepasse, setModalAdicionarRepasse] = useState(false);
  const [modalSearch, setModalSearch] = useState(null); // recebe os dados da publicação

  return (
    <ModalContext.Provider
      value={{
        modalAdicionarSolicitacao,
        setModalAdicionarSolicitacao,
        modalAdicionarRepasse,
        setModalAdicionarRepasse,
        modalSearch,
        setModalSearch,
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
