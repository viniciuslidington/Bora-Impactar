import Filter from "../components/Filter/Filter";
import FilterMobile from "../components/Filter/FilterMobile";
import SearchPostVol from "../components/SearchPosts/SearchPostVol";
import { useSearchSolicitacao } from "../services/searchService";
import Pagination from "../components/Pagination/Pagination.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQueryUpdate } from "../utils/queryUpdate";
import { ModalContext } from "../components/contexts/ModalContext";
import ModalSearch from "../components/ModalSearch/ModalSearch";
import Posts from "../components/HomePosts/Posts.jsx";

export default function SearchVol() {
  const { data, isPending, isError } = useSearchSolicitacao();

  const updateQuery = useQueryUpdate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Converte a string da URL em um objeto manipulável

  const querySort = searchParams.get("sort") || "recentes";
  const sortRef = useRef(querySort);

  const { modalSearch, setModalSearch } = useContext(ModalContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    return setModalSearch(null);
  }, [setModalSearch]);

  // Atualiza o estado `isMobile` quando a largura da tela muda
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
      <div className="flex w-[1366px] max-w-full flex-col justify-between gap-6 py-12 lg:max-w-[1366px] lg:flex-row lg:gap-0 lg:px-[123px]">
        <div className="flex max-w-full min-w-[289px] flex-col gap-8 px-4 lg:px-0">
          <span className="flex flex-col gap-1">
            <h3 className="text-2xl font-semibold opacity-95">
              Resultado da pesquisa
            </h3>
            {isPending ? (
              <p className="w-full text-[14px] opacity-90">Carregando...</p>
            ) : (
              <p className="text-[14px] opacity-90">
                {data ? data?.totalRequests : "0"}{" "}
                {data?.totalRequests === 1 ? "solicitação" : "solicitações"} de
                ONGs foram encontradas
              </p>
            )}
          </span>
          {isMobile ? (
            <FilterMobile showUrgency={true} />
          ) : (
            <Filter showUrgency={true}></Filter>
          )}
        </div>
        <div className="flex w-[768px] max-w-full flex-col gap-8 px-4 lg:px-0">
          <div className="flex min-h-14 w-full items-center justify-between">
            <select
              name=""
              id=""
              className="h-12 rounded border-2 border-gray-400 text-gray-600 outline-gray-600 lg:w-48"
              value={sortRef.current}
              onChange={(e) => {
                const newValue = e.target.value;
                sortRef.current = newValue;
                updateQuery("sort", newValue);
              }}
            >
              <option value="recentes">Recentes</option>
              <option value="expirar">Prestes a Expirar</option>
            </select>
            <Pagination totalPages={data?.totalPages} />
          </div>
          {isError ? (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-[18px] text-red-500">
                Erro ao carregar solicitações
              </p>
            </div>
          ) : isPending && isMobile ? (
            <div className="flex flex-wrap gap-8">
              {Array(6)
                .fill(0)
                .map((_, i) => {
                  return <Posts key={i} isLoading={true} />;
                })}
            </div>
          ) : isPending ? (
            <div className="flex flex-col gap-8">
              {Array(6)
                .fill(0)
                .map((_, i) => {
                  return <SearchPostVol isLoading={true} key={i} />;
                })}
            </div>
          ) : data.requests?.length > 0 && isMobile ? (
            <div className="flex flex-col items-center gap-8">
              {data.requests.map((post) => {
                return (
                  <Posts
                    data={post}
                    key={post.id}
                    onClick={() => setModalSearch(post)}
                  />
                );
              })}
            </div>
          ) : data.requests?.length > 0 ? (
            <div className="hidden flex-col gap-8 lg:flex">
              {data.requests.map((post) => {
                return <SearchPostVol data={post} key={post.id} />;
              })}
            </div>
          ) : (
            <div className="flex h-full w-full max-w-full items-center justify-center">
              <p className="text-[18px]">Nenhuma publicação encontrada!</p>
            </div>
          )}
          <span className="flex w-full justify-end">
            <Pagination totalPages={data?.totalPages} />
          </span>
        </div>
        {modalSearch && <ModalSearch solicitacao={true} />}
      </div>
    </>
  );
}
