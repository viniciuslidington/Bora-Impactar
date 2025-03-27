import { Outlet } from "react-router-dom";
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
import Profile from "../components/Profile/Profile";
import SearchBar from "../components/SearchBar/SearchBar";
import { useUserData } from "../services/authService";
import "ldrs/ring2";

export default function Ong() {
  const { isPending } = useUserData();

  return (
    <div className="flex w-full flex-col items-center">
      <Header>
        <SearchBar placeholder={"Pesquisar repasse de outras ONGS..."} />
        <Profile />
      </Header>
      {isPending ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "80vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <l-ring-2
            size="64"
            stroke="6"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8"
            color="#009fe3;"
          ></l-ring-2>
        </div>
      ) : (
        <Outlet />
      )}
      <Footer />
    </div>
  );
}
