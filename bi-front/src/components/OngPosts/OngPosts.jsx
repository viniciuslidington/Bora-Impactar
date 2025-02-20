import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import postsDatabase1 from "./postsDatabase1";
import postsDatabase2 from "./postsDatabase2";
import Post from "./Post";
import styles from "./ongPosts.module.css";

export default function OngPosts({ tipo }) {
  const [sortPosts, setSortPosts] = useState("data");
  const [searchPosts, setSearchPosts] = useState("");
  const [postsVisiveis, setPostVisiveis] = useState(8); //Limite de posts visíveis
  const [selectedId, setSelectedId] = useState("");

  const descricao =
    tipo === "solicitacao"
      ? "Encontre oportunidades! Aqui, ONGs publicam solicitações de diversas atividades para os voluntários"
      : "Dê uma nova utilidade aos itens parados! Nesta seção, ONGs podem doar recursos que não utilizam mais para outras organizações.";

  //Tipos de ordenação dos posts
  const sortFunctions = {
    data: (a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao),
    expiracao: (a, b) => new Date(a.dataExpiracao) - new Date(b.dataExpiracao),
    alfabetica: (a, b) => a.titulo.localeCompare(b.titulo),
  };

  const [databaseState, setDatabaseState] = useState([]); //  No futuro o useEffect com a requisição ira reagir o editar sendo confirmado e irá dar setDatabaseState

  const sortFunc = sortFunctions[sortPosts]; // Função de ordenação escolhida com base no estado
  const posts = [...databaseState] //Copia do array do database para não editar o database diretamente
    .sort(sortFunc)
    .filter(
      (post) =>
        formatarString(post.titulo).startsWith(formatarString(searchPosts)) //startwith para a barra de pesquisa procurar os primeiros caracteres
    ); //Limitar quantidade de posts visíveis

  const verMaisTxt = postsVisiveis >= posts.length ? "Ver Menos" : "Ver Mais";

  function handleVerMais() {
    if (postsVisiveis >= posts.length) {
      setPostVisiveis(8); //Ver menos
    } else {
      setPostVisiveis((prev) => Math.min(prev + 8, posts.length)); //Ver mais
    }
  }

  function handleEditar(id) {
    setSelectedId(id);
  }

  useEffect(() => {
    tipo === "solicitacao" //Database com base no tipo da sessão (Temporário até o banco de dados ser disponibilizado para utilizarmos requisição http)
      ? setDatabaseState(postsDatabase1)
      : setDatabaseState(postsDatabase2);
    setPostVisiveis(8);
    setSelectedId("");
  }, [tipo, searchPosts]); // retornar os postsVisiveis e selectedId ao estado inicial toda vez que trocar entre solicitação e repasse

  return (
    <>
      <p>{descricao}</p>
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
            placeholder="Pesquisar Publicação"
          />
          <img src="/search.svg" alt="pesquisar icone" />
        </div>
        <div className={styles.postsList}>
          {posts.length > 0 ? (
            posts.slice(0, postsVisiveis).map((post) => {
              return (
                <Post
                  key={post.id}
                  post={post}
                  handleEditar={handleEditar}
                  selected={selectedId === post.id ? true : false}
                  setSelectedId={setSelectedId}
                  setDatabaseState={setDatabaseState} //Enquanto não houver backend
                  databaseState={databaseState} //Enquanto não houver backend
                ></Post>
              );
            })
          ) : (
            <p>Nenhuma publicação encontrada!</p>
          )}
          <p className={styles.verMais} onClick={handleVerMais}>
            {posts.length > 8 && verMaisTxt}
          </p>
        </div>
      </div>
    </>
  );
}

// Função auxiliar para normalizar e remover acentos
function formatarString(str) {
  return str
    .toLowerCase() // Formata a string para minúsculo
    .normalize("NFD") // Normaliza a string
    .replace(/[\u0300-\u036f]/g, ""); // Remove a acentuação
}

OngPosts.propTypes = {
  tipo: PropTypes.string.isRequired,
};
