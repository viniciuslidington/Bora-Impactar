import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import Post from "./SolicitacaoPost";
import { ModalContext } from "../contexts/ModalContext";
import { formatarString } from "../../utils/formatString";
import {
  useSolicitacoes,
  useHandleError,
} from "../../services/userSolicitacoesService";

//Tipos de ordenação dos posts
const sortFunctions = {
  data: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  expiracao: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  alfabetica: (a, b) => a.title.localeCompare(b.title),
};

export default function OngPosts() {
  const { data = [], isPending, isError, error } = useSolicitacoes();

  const handleError = useHandleError();

  const [sortPosts, setSortPosts] = useState("data");
  const [searchPosts, setSearchPosts] = useState("");
  const [postsVisiveis, setPostVisiveis] = useState(8); //Limite de posts visíveis
  const [selectedId, setSelectedId] = useState("");

  const { setModalAdicionarSolicitacao, modalAdicionarSolicitacao } =
    useContext(ModalContext);

  const sortFunc = sortFunctions[sortPosts]; // Função de ordenação escolhida com base no estado
  const posts = [...data] //Copia do array do database para não editar o database diretamente
    .sort(sortFunc)
    .filter(
      (post) =>
        formatarString(post.title).startsWith(formatarString(searchPosts)), //startwith para a barra de pesquisa procurar os primeiros caracteres
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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    setPostVisiveis(8);
    setSelectedId("");
  }, [searchPosts, modalAdicionarSolicitacao]); // retornar os postsVisiveis e selectedId ao estado inicial toda vez que trocar entre solicitação e repasse

  useEffect(() => {
    if (isError) {
      handleError(error); // Usando a função utilitária para lidar com erros
    }
  }, [isError, error, handleError]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize); // Adiciona o listener
    return () => {
      window.removeEventListener("resize", handleResize); // Remove o listener ao desmontar
    };
  }, []);

  return (
    <>
      <p>
        Encontre oportunidades! Aqui, ONGs publicam solicitações de diversas
        atividades para os voluntários
      </p>
      <div className="flex w-full flex-wrap gap-4">
        <Button
          className="flex h-[48px] w-[calc(50%-8px)] cursor-pointer items-center justify-center gap-4 rounded-sm border-none bg-[#294bb6] px-2 py-3 text-base font-medium text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-100 ease-in hover:bg-[#335fee] disabled:opacity-70 lg:w-[172px]"
          onClick={() => setModalAdicionarSolicitacao(true)}
        >
          Adicionar <span className="text-2xl">+</span>
        </Button>
        <select
          name="sortPosts"
          value={sortPosts}
          onChange={(e) => setSortPosts(e.target.value)}
          className="h-12 w-[calc(50%-8px)] rounded border-2 border-[#9c9c9c] px-1 text-[#232323] lg:w-[196px]"
        >
          <option value="data">Data de Publicação</option>
          <option value="expiracao">Prestes a Expirar</option>
          <option value="alfabetica">Ordem Alfabética</option>
        </select>
        <div className="relative w-full lg:w-auto">
          <input
            type="text"
            value={searchPosts}
            onChange={(e) => setSearchPosts(e.target.value)}
            placeholder="Pesquisar Publicação"
            className="h-12 w-full rounded border-2 border-[#9c9c9c] px-2 pr-8 text-base text-[#232323] lg:w-[300px]"
          />
          <img
            src="/search.svg"
            alt="pesquisar icone"
            className="absolute top-1/2 right-2 -translate-y-1/2"
          />
        </div>
        <div className="flex min-h-[250px] w-full flex-col items-center gap-2 rounded bg-[#eaeaea] p-3">
          {isError ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-red-500">Erro ao carregar solicitações</p>
            </div>
          ) : isPending ? (
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
                  isMobile={isMobile}
                ></Post>
              );
            })
          ) : (
            <div className="flex h-full items-center justify-center">
              <p>Nenhuma publicação encontrada</p>
            </div>
          )}
          <p className="cursor-pointer underline" onClick={handleVerMais}>
            {posts.length > 8 && verMaisTxt}
          </p>
        </div>
      </div>
    </>
  );
}
