import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
import Profile from "../components/Profile/Profile";
import SearchBar from "../components/SearchBar/SearchBar";

export default function Voluntario() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
        <SearchBar placeholder={"Pesquisar demandas das ONGS..."} />
        <Profile />
      </Header>
      <Outlet />
      <Footer />
    </div>
  );
}
