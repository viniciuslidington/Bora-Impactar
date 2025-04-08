import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../assets/LogoRecifePrefeitura.svg";

export default function Logo({ className }) {
  const navigate = useNavigate();

  return (
    <img
      src={logo}
      alt="Logo"
      className={className}
      onClick={() => navigate("/")}
    />
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};
