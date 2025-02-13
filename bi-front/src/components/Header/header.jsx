import Logo from "../Logo/logo";
import styles from "./header.module.css";
import PropTypes from "prop-types";

export default function Header({ children }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        {children}
      </div>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};
