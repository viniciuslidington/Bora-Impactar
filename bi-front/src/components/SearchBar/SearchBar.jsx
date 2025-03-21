import { useState } from "react";
import propTypes from "prop-types";

export default function SearchBar({ placeholder, handleSearch }) {
  const [input, setInput] = useState("");

  return (
    <div className="absolute left-1/2 -translate-x-1/2 transform">
      <input
        type="text"
        className="h-12 w-[500px] rounded-sm border-none bg-white p-3 pr-11 text-base"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && handleSearch;
        }}
      />
      <img
        src="/search.svg"
        alt="Pesquisar"
        onClick={handleSearch}
        className="absolute top-1/2 right-3 w-6 -translate-y-1/2 transform cursor-pointer object-cover object-center opacity-85"
      />
    </div>
  );
}

SearchBar.propTypes = {
  placeholder: propTypes.string,
  handleSearch: propTypes.func,
};
