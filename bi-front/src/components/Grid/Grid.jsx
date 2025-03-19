import PropTypes from "prop-types";

export default function Grid({ children }) {
  return (
    <div className={`w-[928px]} flex max-w-full flex-wrap gap-8`}>
      {children}
    </div>
  );
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};
