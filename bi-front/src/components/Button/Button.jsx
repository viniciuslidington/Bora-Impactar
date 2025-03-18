import PropTypes from "prop-types";

export default function Button({
  children,
  className = `cursor-pointer rounded-sm border-none bg-[#294bb6] px-2 py-3 text-base font-medium text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#335fee] disabled:opacity-70`,
  addClassName = "",
  onClick,
  disabled = false,
}) {
  return (
    <button
      className={addClassName + " " + className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  addClassName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
