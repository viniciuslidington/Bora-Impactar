import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../assets/LogoRecifePrefeitura.svg";

export default function Logo({ className }) {
  return (
    <Link to={"/"}>
      <img src={logo} alt="Logo" className={className} />
    </Link>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};
