import { useState } from "react";
import Button from "../Button/Button";
import postsDatabase from "./postsDatabase";
import Post from "./Post";
import styles from "./ongPosts.module.css";

export default function OngPosts() {
  const [sortPosts, setSortPosts] = useState("data");
  const [searchPosts, setSearchPosts] = useState("");

  const sortFunctions = {
    data: (a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao),
    expiracao: (a, b) => new Date(a.dataExpiracao) - new Date(b.dataExpiracao),
    alfabetica: (a, b) => a.titulo.localeCompare(b.titulo),
  };

  const sortFunc = sortFunctions[sortPosts];
  const posts = [...postsDatabase].sort(sortFunc).filter(
    (post) =>
      post.titulo
        .toLowerCase() //Formata o titulo para minusculo
        .normalize("NFD") //Normaliza a string
        .replace(/[\u0300-\u036f]/g, "") //Remove a acentuação
        .startsWith(searchPosts.toLowerCase()) //startwith para a barra de pesquisa procurar os primeiros caracteres
  );

  return (
    <div className={styles.ongPosts}>
      <Button customClass={styles.customClass}>
        Adicionar <span className={styles.plusIcon}>+</span>
      </Button>
      <select
        name="sortPosts"
        value={sortPosts}
        onChange={(e) => setSortPosts(e.target.value)}
      >
        <option value="data">Data de Publicação</option>
        <option value="expiracao">Prestes a Expirar</option>
        <option value="alfabetica">Ordem Alfabética</option>
      </select>
      <div className={styles.input}>
        <input
          type="text"
          value={searchPosts}
          onChange={(e) => setSearchPosts(e.target.value)}
        />
        <img src="/search.svg" alt="searchIcon" />
      </div>
      <div className={styles.postsList}>
        {posts.length > 0 ? (
          posts.map((post) => {
            return <Post key={post.id} post={post}></Post>;
          })
        ) : (
          <p>Nenhum post encontrado!</p>
        )}
      </div>
    </div>
  );
}
