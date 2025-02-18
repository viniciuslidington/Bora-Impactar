import { Outlet } from "react-router-dom";
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
import Profile from "../components/Profile/Profile";
import SearchBar from "../components/SearchBar/SearchBar";
import styles from "../styles/homeong.module.css";

export default function Ong() {
  return (
    <div className={styles.homeOng}>
      <Header>
        <SearchBar />
        <Profile />
      </Header>
      <Outlet />
      <Footer />
    </div>
  );
}
