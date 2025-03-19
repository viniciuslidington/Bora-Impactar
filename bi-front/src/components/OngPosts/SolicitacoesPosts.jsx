import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import Post from "./Post";
import { ModalContext } from "../contexts/ModalContext";
import { formatarString } from "../../utils/formatString";
import styles from "./ongPosts.module.css";
import { useSolicitacoes } from "../../services/userSolicitacoesService";
import toast from "react-hot-toast";

//Tipos de ordenação dos posts
const sortFunctions = {
  data: (a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao),
  expiracao: (a, b) => new Date(a.dataExpiracao) - new Date(b.dataExpiracao),
  alfabetica: (a, b) => a.titulo.localeCompare(b.titulo),
};

export default function OngPosts() {
  const { data = [], isPending, isError, error } = useSolicitacoes();

  const [sortPosts, setSortPosts] = useState("data");
  const [searchPosts, setSearchPosts] = useState("");
  const [postsVisiveis, setPostVisiveis] = useState(8); //Limite de posts visíveis
  const [selectedId, setSelectedId] = useState("");

  const { setModalAdicionar, modalAdicionar } = useContext(ModalContext);

  const sortFunc = sortFunctions[sortPosts]; // Função de ordenação escolhida com base no estado
  const posts = [...data] //Copia do array do database para não editar o database diretamente
    .sort(sortFunc)
    .filter(
      (post) =>
        formatarString(post.titulo).startsWith(formatarString(searchPosts)), //startwith para a barra de pesquisa procurar os primeiros caracteres
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
    setPostVisiveis(8);
    setSelectedId("");
  }, [searchPosts, modalAdicionar]); // retornar os postsVisiveis e selectedId ao estado inicial toda vez que trocar entre solicitação e repasse

  useEffect(() => {
    if (isError) {
      if (isError === true) {
        error.response?.status === 401
          ? toast.error("Realize login novamente!")
          : toast.error("Erro ao carregar solicitações");
      }
    }
  }, [error, isError]);

  return (
    <>
      <p>
        Encontre oportunidades! Aqui, ONGs publicam solicitações de diversas
        atividades para os voluntários
      </p>
      <div className={styles.ongPosts}>
        <Button
          className="flex h-[48px] w-[172px] cursor-pointer items-center justify-center gap-4 rounded-sm border-none bg-[#294bb6] px-2 py-3 text-base font-medium text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#335fee] disabled:opacity-70"
          onClick={() => setModalAdicionar(true)}
        >
          Adicionar <span className={styles.plusIcon}>+</span>
        </Button>
        <select
          name="sortPosts"
          value={sortPosts}
          onChange={(e) => setSortPosts(e.target.value)} //Adicionar tipo no futuro
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
          {isPending ? (
            <div className="flex h-full items-center justify-center">
              <l-ring-2
                size="64"
                stroke="6"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8"
                color="#009fe3;"
              ></l-ring-2>
            </div>
          ) : posts.length > 0 ? (
            posts.slice(0, postsVisiveis).map((post) => {
              return (
                <Post
                  key={post.id}
                  post={post}
                  handleEditar={handleEditar}
                  selected={selectedId === post.id ? true : false}
                  setSelectedId={setSelectedId}
                ></Post>
              );
            })
          ) : (
            <div className="flex h-full items-center justify-center">
              <p>Nenhuma publicação encontrada!</p>
            </div>
          )}
          <p className={styles.verMais} onClick={handleVerMais}>
            {posts.length > 8 && verMaisTxt}
          </p>
        </div>
      </div>
    </>
  );
}
