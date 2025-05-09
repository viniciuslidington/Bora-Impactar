import Logo from "../Logo/logo";
import PropTypes from "prop-types";

export default function Header({ children }) {
  return (
    <header className="flex h-[88px] w-full items-center justify-center bg-[#009fe3]">
      <div className="flex w-full max-w-[1366px] items-center justify-between px-[123px] py-0">
        <Logo />
        {children}
      </div>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};
