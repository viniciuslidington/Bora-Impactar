import PropTypes from "prop-types";

export default function Grid({ children }) {
  return (
    <div className={`flex w-[928px] max-w-full flex-wrap gap-4 lg:gap-8`}>
      {children}
    </div>
  );
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};
