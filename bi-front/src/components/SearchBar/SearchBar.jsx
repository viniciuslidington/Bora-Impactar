import { useState } from "react";
import propTypes from "prop-types";
import { useQueryUpdate } from "../../utils/queryUpdate";
import { useLocation } from "react-router-dom";

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
      className={container ?? "absolute left-1/2 -translate-x-1/2 transform"}
    >
      <input
        type="text"
        className={
          className ??
          "h-12 w-[500px] rounded-sm border-none bg-white p-3 pr-11 text-base"
        }
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && updateQuery("title", input);
        }}
      />

      <img
        src="/search.svg"
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
