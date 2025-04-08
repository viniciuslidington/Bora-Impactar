import { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useLogout, useUserData } from "../../services/authService";
import "ldrs/ring2";
import placeholderImg from "../../assets/placeholder-image.jpg";
import homeImg from "../../assets/home.svg";
import logoutImg from "../../assets/logout.svg";

export default function Profile() {
  const navigate = useNavigate();
  const { data: authData, isPending: isUserDataLoading } = useUserData();
  const { mutate: logout } = useLogout();

  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const logoUrl = authData?.userData?.ngo?.logo_photo_url || placeholderImg;

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
      <div className="flex flex-row" ref={dropdownRef}>
        <div
          className="flex h-22 cursor-pointer items-center gap-3"
          onClick={() => setDropdown(!dropdown)}
        >
          <p className="max-w-[196px] truncate text-sm font-semibold text-white">
            {authData.userData.ngo.name}
          </p>
          {/* o chat tava crente que  border-radius: 50% era rounded-full, não consegui achar outro */}
          <img
            src={logoUrl}
            alt="userLogo"
            className="h-14 w-14 rounded-full object-cover object-center"
          />
        </div>
        {dropdown && (
          <div className="absolute top-20 z-10 -translate-x-9 transform rounded-sm border-2 border-[#92deff79] bg-[#cef0ff] shadow-md">
            <div className="flex flex-wrap items-center gap-2 border-b-2 border-[#92deff79] p-3">
              <img
                src={logoUrl}
                alt="userLogo"
                className="h-14 w-14 rounded-full object-cover object-center"
              />
              <div className="flex flex-col justify-between">
                <p className="max-w-[208px] truncate">
                  {authData.userData.ngo.name}
                </p>
                <p className="max-w-[208px] truncate">
                  {authData.userData.user.email}
                </p>
              </div>
            </div>
            <button
              className="flex w-full cursor-pointer items-center gap-4 border-none bg-none p-5 transition-all duration-100 hover:bg-[#f8fdff]"
              onClick={() => navigate("/ong/home/solicitacoes")}
            >
              <img src={homeImg} alt="homeIcon" className="h-7 w-7" />{" "}
              <p className="text-base font-semibold no-underline">Home</p>
            </button>
            <button
              className="flex w-full cursor-pointer items-center gap-4 rounded-br-sm rounded-bl-sm border-none bg-none p-5 transition-all duration-100 hover:bg-[#f8fdff]"
              onClick={() => logout()}
            >
              <img src={logoutImg} alt="logoutIcon" className="h-7 w-7" />{" "}
              <p className="text-base font-semibold no-underline">Logout</p>
            </button>
          </div>
        )}
      </div>
    );
  } else if (isUserDataLoading) {
    return (
      <l-ring-2
        size="40"
        stroke="5"
        stroke-length="0.25"
        bg-opacity="0.1"
        speed="0.8"
        color="white"
      ></l-ring-2>
    );
  } else {
    return (
      <Link to="/login" className={"text-base text-white underline"}>
        Logar como ONG
      </Link>
    );
  }
}
