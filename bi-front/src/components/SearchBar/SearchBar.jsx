import { useState } from "react";
import propTypes from "prop-types";
import { useQueryUpdate } from "../../utils/queryUpdate";
import { useLocation } from "react-router-dom";

export default function SearchBar({ placeholder }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Converte a string da URL em um objeto manipulável
  const queryParam = searchParams.get("q") || "";
  const [input, setInput] = useState(queryParam);
  const updateQuery = useQueryUpdate();

  return (
    <div className="absolute left-1/2 -translate-x-1/2 transform">
      <input
        type="text"
        className="h-12 w-[500px] rounded-sm border-none bg-white p-3 pr-11 text-base"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && updateQuery("q", input);
        }}
      />

      <img
        src="/search.svg"
        onClick={() => {
          updateQuery("q", input);
        }}
        className="absolute top-1/2 right-3 w-6 -translate-y-1/2 transform cursor-pointer object-cover object-center opacity-85"
      />
    </div>
  );
}

SearchBar.propTypes = {
  placeholder: propTypes.string,
};
