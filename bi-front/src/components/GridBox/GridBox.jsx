import PropTypes from "prop-types";
import styles from "./gridBox.module.css";

export default function GridBox({ children, imgUrl }) {
  return (
    <div
      className={styles.gridBox}
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      {children}
    </div>
  );
}

GridBox.propTypes = {
  children: PropTypes.string.isRequired,
  imgUrl: PropTypes.node,
};
