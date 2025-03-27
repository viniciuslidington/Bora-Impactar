import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function GridBox({ children, imgUrl, link }) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex h-[160px] flex-1 basis-[calc(33.333%-32px)] cursor-pointer items-center justify-center gap-8 rounded-sm text-white transition duration-200 ease-in-out hover:scale-[1.02] lg:h-[200px] bg-[url(${imgUrl})]`}
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
