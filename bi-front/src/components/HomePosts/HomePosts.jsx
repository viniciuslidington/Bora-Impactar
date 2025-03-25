import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useQueryUpdateHome } from "../../utils/queryUpdate";
import { useSearchSolicitacao } from "../../services/searchService";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import Posts from "./Posts";

export default function HomePosts() {
  const { data, isPending, isError } = useSearchSolicitacao();

  const updateQuery = useQueryUpdateHome();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Converte a string da URL em um objeto manipulável

  const querySort = searchParams.get("sort") || "";
  const sortRef = useRef(querySort);

  return (
    <div className="flex w-[1366px] flex-col gap-8 px-[123px] pb-16">
      <span>
        <h2 className="text-[36px] font-bold">
          Confira mais solicitações de ONGs
        </h2>
        <p className="text-[14px]">
          Acompanhe as publicações e veja como você pode contribuir para causas
          que fazem a diferença
        </p>
      </span>
      <div className="flex flex-col gap-8">
        <span className="flex gap-8">
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
          <SearchBar
            container={"relative"}
            className={
              "h-12 w-[512px] rounded-sm border-2 border-[#9c9c9c] bg-white p-3 pr-11 text-base"
            }
            placeholder={"Pesquisar demandas das ONGs..."}
          />
        </span>
        {isError ? (
          <div className="flex h-[558px] w-full items-center justify-center">
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
          <div className="flex flex-wrap gap-8">
            {data.requests.map((post) => {
              return <Posts data={post} key={post.id} />;
            })}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-[18px]">Nenhuma publicação encontrada!</p>
          </div>
        )}
        <Pagination totalPages={data?.totalPages} homePag={true} />
      </div>
    </div>
  );
}
