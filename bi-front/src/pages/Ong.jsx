import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ModalContext } from "../components/contexts/ModalContext";
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
import Profile from "../components/Profile/Profile";
import SearchBar from "../components/SearchBar/SearchBar";
import ModalAdicionar from "../components/ModalAdicionar/ModalAdicionar";

export default function Ong() {
  const { modalAdicionar } = useContext(ModalContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Header>
        <SearchBar placeholder={"Pesquisar repasse de outras ONGS..."} />
        <Profile />
      </Header>
      <Outlet />
      <Footer />
      {modalAdicionar && <ModalAdicionar />}
    </div>
  );
}
