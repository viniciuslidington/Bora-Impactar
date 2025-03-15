import { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import styles from "./profile.module.css";
import { useLogout, useUserData } from "../../services/authService";

export default function Profile() {
  const navigate = useNavigate();
  const { data: authData, isPending: isUserDataLoading } = useUserData();
  const { mutate: logout } = useLogout();

  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const logoUrl = authData?.userData?.ngo?.gallery_images_url[0];
  const img1Url = authData?.userData?.ngo?.gallery_images_url[1];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (authData) {
    return (
      <div className={styles.profile} ref={dropdownRef}>
        <div
          className={styles.profileMainContent}
          onClick={() => setDropdown(!dropdown)}
        >
          <p>{authData.userData.ngo.name}</p>
          <img src={logoUrl} alt="userLogo" />
        </div>
        {dropdown && (
          <div className={styles.dropdown}>
            <div className={styles.section}>
              <img src={img1Url} alt="userLogo" />
              <div className={styles.sectionContent}>
                <p>{authData.user}</p>
                <p>{authData.userData.user.email}</p>
              </div>
            </div>
            <button
              className={styles.homePageBtn}
              onClick={() => navigate("/ong/home/solicitacoes")}
            >
              <img src="/home.svg" alt="homeIcon" /> <p>Home</p>
            </button>
            <button className={styles.logout} onClick={() => logout()}>
              <img src="/logout.svg" alt="logoutIcon" /> <p>Logout</p>
            </button>
          </div>
        )}
      </div>
    );
  } else if (isUserDataLoading) {
    return <p>Carregando...</p>;
  } else {
    return (
      <Link to="/login" className={styles.link}>
        Logar como ONG
      </Link>
    );
  }
}
