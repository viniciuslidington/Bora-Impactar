import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function GridBox({ children, imgUrl, link }) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex h-[160px] flex-1 basis-[calc(50%-16px)] cursor-pointer items-center justify-center rounded-sm text-white transition duration-200 ease-in-out hover:scale-[1.02] lg:h-[200px] lg:basis-[calc(33.333%-32px)] bg-[url(${imgUrl})] bg-cover text-center text-sm lg:text-base`}
      style={{ backgroundImage: `url(${imgUrl})` }}
      onClick={() => navigate(link)}
    >
      {children}
    </div>
  );
}

GridBox.propTypes = {
  children: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  link: PropTypes.string,
};
