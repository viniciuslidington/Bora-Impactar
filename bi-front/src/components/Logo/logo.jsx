import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Logo({ className }) {
  return (
    <Link to={"/"} className={className}>
      <img src="/LogoRecifePrefeitura.svg" alt="Logo" />
    </Link>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};
