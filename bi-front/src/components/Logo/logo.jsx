import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Logo({ className }) {
  return (
    <Link to={"/"}>
      <img src="/LogoRecifePrefeitura.svg" alt="Logo" className={className} />
    </Link>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};
