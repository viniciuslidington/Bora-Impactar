import Filter from "../components/Filter/Filter";
import SearchPostVol from "../components/SearchPosts/SearchPostVol";
import { useSearchSolicitacao } from "../services/searchService";
import Pagination from "../components/Pagination/pagination";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useQueryUpdate } from "../utils/queryUpdate";

export default function SearchVol() {
  const { data, isPending } = useSearchSolicitacao();

  const updateQuery = useQueryUpdate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Converte a string da URL em um objeto manipulável
  const queryParam = searchParams.get("page") || 1;
  const pageRef = useRef(queryParam);

  return (
    <div className="flex w-[1366px] justify-between px-[123px] py-16">
      <div className="flex w-[289px] flex-col gap-8">
        <span className="flex flex-col gap-1">
          <h3 className="text-2xl font-semibold opacity-95">
            Resultado da pesquisa
          </h3>
          {isPending ? (
            <p className="w-full text-[14px] opacity-90">Carregando...</p>
          ) : (
            <p className="text-[14px] opacity-90">
              {data.totalRequests}{" "}
              {data.totalRequests === 1 ? "solicitação" : "solicitações"} de
              ONGs foram encontradas
            </p>
          )}
        </span>
        <Filter></Filter>
      </div>
      {isPending ? (
        <div className="flex w-full items-center justify-center">
          <l-ring-2
            size="64"
            stroke="6"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8"
            color="#009fe3"
          ></l-ring-2>
        </div>
      ) : data.requests?.length > 0 ? (
        <div className="flex flex-col items-end gap-10">
          <Pagination
            totalPages={data.totalPages}
            currentPage={pageRef}
            onPageChange={(e) => {
              pageRef.current = e;
              updateQuery("page", e);
            }}
          />
          <div className="flex flex-col gap-8">
            {data.requests.map((post) => {
              return <SearchPostVol data={post} key={post.id} />;
            })}
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center">
          <p className="text-[18px]">Nenhuma publicação encontrada!</p>
        </div>
      )}
    </div>
  );
}
