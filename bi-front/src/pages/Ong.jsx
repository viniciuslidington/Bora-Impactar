import { Outlet } from "react-router-dom";
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
import Profile from "../components/Profile/Profile";
import SearchBar from "../components/SearchBar/SearchBar";
import ModalAdicionar from "../components/ModalAdicionar/ModalAdicionar";
import styles from "../styles/ong.module.css";

export default function Ong() {
  return (
    <div className={styles.ong}>
      <Header>
        <SearchBar />
        <Profile />
      </Header>
      <Outlet />
      <Footer />
      <ModalAdicionar />
    </div>
  );
}
