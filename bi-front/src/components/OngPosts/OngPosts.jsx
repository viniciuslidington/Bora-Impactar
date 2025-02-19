import { useState } from "react";
import Button from "../Button/Button";
import postsDatabase from "./postsDatabase";
import styles from "./ongPosts.module.css";

export default function OngPosts() {
  const { sortPosts, setSortPosts } = useState("data");

  return (
    <div className={styles.ongPosts}>
      <Button>Adicionar</Button>
      <select
        name="sortPosts"
        className="select"
        value={sortPosts}
        onChange={(e) => setSortPosts(e.target.value)}
      >
        <option value="data">Data de Publicação</option>
        <option value="expiracao">Prestes a Expirar</option>
        <option value="alfabetica">Ordem Alfabética</option>
      </select>
      <div className="postsList"></div>
    </div>
  );
}
