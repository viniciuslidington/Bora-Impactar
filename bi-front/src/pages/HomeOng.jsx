import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
import Profile from "../components/Profile/Profile";
import { Outlet } from "react-router-dom";
import styles from "../styles/homeong.module.css";

export default function HomeOng() {
  return (
    <div className={styles.homeOng}>
      <Header>
        <Profile />
      </Header>
      <Outlet />
      <Footer />
    </div>
  );
}
