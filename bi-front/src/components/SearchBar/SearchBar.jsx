import { useState } from "react";
import styles from "./searchBar.module.css";
import propTypes from "prop-types";
import { useQueryUpdate } from "../../utils/queryUpdate";

export default function SearchBar({ placeholder }) {
  const [input, setInput] = useState("");
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
