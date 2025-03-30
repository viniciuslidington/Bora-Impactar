import Logo from "../Logo/logo";
import PropTypes from "prop-types";

export default function Header({ children }) {
  return (
    <header className="flex w-full items-center justify-center bg-[#009fe3] lg:h-[88px]">
      <div className="flex w-full max-w-[1366px] flex-wrap items-center justify-between gap-y-4 px-4 py-4 lg:px-[123px] lg:py-0">
        <Logo className="w-2/5 lg:w-auto" />
        {children}
      </div>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};
