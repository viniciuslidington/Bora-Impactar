import { Outlet } from "react-router-dom";
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
import Profile from "../components/Profile/Profile";
import SearchBar from "../components/SearchBar/SearchBar";
import ModalAdicionar from "../components/ModalAdicionar/ModalAdicionar";
import styles from "../styles/ong.module.css";
import { useContext } from "react";
import { ModalContext } from "../components/contexts/ModalContext";

export default function Ong() {
  const { modalAdicionar } = useContext(ModalContext);
  return (
    <div className={styles.ong}>
      <Header>
        <SearchBar />
        <Profile />
      </Header>
      <Outlet />
      <Footer />
      {modalAdicionar && <ModalAdicionar />}
    </div>
  );
}
