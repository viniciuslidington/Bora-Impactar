import PropTypes from "prop-types";
import styles from "./grid.module.css";

export default function Grid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};
