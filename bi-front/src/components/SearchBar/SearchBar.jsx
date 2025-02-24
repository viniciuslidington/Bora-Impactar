import { useState } from "react";
import styles from "./searchBar.module.css";
import propTypes from "prop-types";

export default function SearchBar({ placeholder, handleSearch }) {
  const [input, setInput] = useState("");

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && handleSearch;
        }}
      />
      <img src="/search.svg" alt="Pesquisar" onClick={handleSearch} />
    </div>
  );
}

SearchBar.propTypes = {
  placeholder: propTypes.string,
  handleSearch: propTypes.func,
};
