import { useState } from "react";
import propTypes from "prop-types";
import { useQueryUpdate } from "../../utils/queryUpdate";
import { useLocation } from "react-router-dom";
import searchImg from "../../assets/search.svg";

export default function SearchBar({
  placeholder,
  className,
  container,
  iconOpacity,
}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Converte a string da URL em um objeto manipulável
  const queryParam = searchParams.get("title") || "";
  const [input, setInput] = useState(queryParam);
  const updateQuery = useQueryUpdate();

  return (
    <div
      className={
        container ??
        "relative order-3 w-full lg:absolute lg:left-1/2 lg:order-2 lg:w-auto lg:-translate-x-1/2 lg:transform"
      }
    >
      <input
        type="text"
        className={
          className ??
          "h-12 w-full rounded-sm border-none bg-white p-3 pr-11 text-base lg:w-[500px]"
        }
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && updateQuery("title", input);
        }}
      />

      <img
        src={searchImg}
        onClick={() => {
          updateQuery("title", input);
        }}
        className={`absolute top-1/2 right-3 w-6 -translate-y-1/2 transform cursor-pointer object-cover object-center opacity-${iconOpacity ?? 85}`}
      />
    </div>
  );
}

SearchBar.propTypes = {
  placeholder: propTypes.string,
  className: propTypes.string,
  container: propTypes.string,
  iconOpacity: propTypes.number,
};
