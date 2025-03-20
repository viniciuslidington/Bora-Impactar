import { useState } from "react";
import styles from "./searchBar.module.css";
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
    <div className={styles.searchBar}>
      <input
        type="text"
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
      />
    </div>
  );
}

SearchBar.propTypes = {
  placeholder: propTypes.string,
};
