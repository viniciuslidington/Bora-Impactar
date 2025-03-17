import PropTypes from "prop-types";
import styles from "./button.module.css";

export default function Button({
  children,
  customClass,
  onClick,
  disabled = false,
}) {
  return (
    <button
      className={`${styles.button} ${customClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  customClass: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
