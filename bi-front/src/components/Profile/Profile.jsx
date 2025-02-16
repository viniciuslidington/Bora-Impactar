import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./profile.module.css";

export default function Profile() {
  const { isAuthenticated, user, userData, logout } = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  if (isAuthenticated === true) {
    return (
      <div className={styles.profile} ref={dropdownRef}>
        <div
          className={styles.profileMainContent}
          onClick={() => setDropdown(!dropdown)}
        >
          <p>{userData.ngo.name}</p>
          <img src="./userIconPlaceholder.png" alt="userLogo" />
        </div>
        {dropdown && (
          <div className={styles.dropdown}>
            <div className={styles.section}>
              <img src="./userIconPlaceholder.png" alt="userLogo" />
              <div className={styles.sectionContent}>
                <p>{user}</p>
                <p>{userData.user.email}</p>
              </div>
            </div>
            <button
              className={styles.homePageBtn}
              onClick={() => navigate("/ong")}
            >
              <img src="./home.svg" alt="homeIcon" /> <p>Home</p>
            </button>
            <button className={styles.logout} onClick={logout}>
              <img src="./logout.svg" alt="logoutIcon" /> <p>Logout</p>
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <Link to="/login" className={styles.link}>
        Logar como Ong
      </Link>
    );
  }
}
