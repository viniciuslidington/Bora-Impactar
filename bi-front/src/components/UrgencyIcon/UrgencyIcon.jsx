import PropTypes from "prop-types";

export default function UrgencyIcon({ urgency, className }) {
  const svgColor = {
    LOW: "text-[#90C145]",
    MEDIUM: "text-[#FCC30B]",
    HIGH: "text-[#DB1E2F]",
  };

  return (
    <svg
      className={`${className} ${svgColor[urgency]}`}
      viewBox="0 0 32 32"
      fill="currentColor"
    >
      <rect
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        rx="16"
        fill="currentColor"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M16 16V10M16 20.4473V20.5M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

UrgencyIcon.propTypes = {
  urgency: PropTypes.oneOf(["LOW", "MEDIUM", "HIGH"]).isRequired,
  className: PropTypes.string,
};
