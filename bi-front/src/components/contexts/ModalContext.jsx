import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [modalAdicionarSolicitacao, setModalAdicionarSolicitacao] =
    useState(false);
  const [modalAdicionarRepasse, setModalAdicionarRepasse] = useState(false);
  const [modalSearch, setModalSearch] = useState(null); // recebe os dados da publicação
  const [modalConfirm, setModalConfirm] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        modalAdicionarSolicitacao,
        setModalAdicionarSolicitacao,
        modalAdicionarRepasse,
        setModalAdicionarRepasse,
        modalSearch,
        setModalSearch,
        modalConfirm,
        setModalConfirm,
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
