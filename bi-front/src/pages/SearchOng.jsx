import Filter from "../components/Filter/Filter";
import SearchPostOng from "../components/SearchPosts/SearchPostOng";
import { useSearchRepasse } from "../services/searchService";
import Pagination from "../components/Pagination/pagination";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useQueryUpdate } from "../utils/queryUpdate";

export default function SearchOng() {
  const { data, isPending, isError } = useSearchRepasse();

  const updateQuery = useQueryUpdate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Converte a string da URL em um objeto manipulável
  const queryPage = searchParams.get("page") || 1;
  const pageRef = useRef(Number(queryPage));
  const querySort = searchParams.get("sort") || "";
  const sortRef = useRef(querySort);

  return (
    <div className="flex w-[1366px] justify-between px-[123px] py-16">
      <div className="flex min-w-[289px] flex-col gap-8">
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
        <Filter></Filter>
      </div>
      <div className="flex w-[768px] flex-col gap-8">
        <div className="flex min-h-14 w-full items-center justify-between">
          <select
            name=""
            id=""
            className="h-12 w-48 rounded border-2 border-gray-400 text-gray-600 outline-gray-600"
            value={sortRef.current}
            onChange={(e) => {
              const newValue = e.target.value;
              sortRef.current = newValue;
              updateQuery("sort", newValue);
            }}
          >
            <option value="">Relevância</option>
            <option value="recentes">Recentes</option>
            <option value="expirar">Prestes a Expirar</option>
          </select>
          <Pagination
            totalPages={data?.totalPages}
            currentPage={pageRef.current}
            onPageChange={(e) => {
              pageRef.current = e;
              updateQuery("page", e);
            }}
          />
        </div>
        {isError ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-[18px] text-red-500">
              Erro ao carregar solicitações
            </p>
          </div>
        ) : isPending ? (
          <div className="flex h-[1744px] w-full items-start justify-center">
            <span className="sticky top-[240px] flex h-[563px] items-center">
              <l-ring-2
                size="64"
                stroke="6"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8"
                color="#009fe3"
              ></l-ring-2>
            </span>
          </div>
        ) : data.requests?.length > 0 ? (
          <div className="flex flex-col gap-8">
            {data.requests.map((post) => {
              return <SearchPostOng data={post} key={post.id} />;
            })}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-[18px]">Nenhuma publicação encontrada!</p>
          </div>
        )}
        <span className="flex w-full justify-end">
          <Pagination
            totalPages={data?.totalPages}
            currentPage={pageRef.current}
            onPageChange={(e) => {
              pageRef.current = e;
              updateQuery("page", e);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </span>
      </div>
    </div>
  );
}
