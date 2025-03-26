import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useQueryUpdateHome } from "../../utils/queryUpdate";
import { useSearchRepasse } from "../../services/searchService";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import Posts from "./Posts";

export default function HomePosts() {
  const { data, isPending, isError } = useSearchRepasse();

  const updateQuery = useQueryUpdateHome();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Converte a string da URL em um objeto manipulável

  const querySort = searchParams.get("sort") || "";
  const sortRef = useRef(querySort);

  return (
    <div className="flex w-[1366px] flex-col gap-8 px-[123px] pb-16">
      <span className="flex flex-col gap-1">
        <h2 className="text-[36px] font-bold">
          Confira os repasses disponíveis de outras ONGs
        </h2>
        <p className="text-[16px]">
          Acompanhe as publicações e descubra oportunidades para adquirir
          recursos ociosos de outras ONGs
        </p>
      </span>
      <div className="flex flex-col gap-8">
        <span className="flex gap-8">
          <select
            name=""
            id=""
            className="h-12 w-48 rounded border-2 border-[#9c9c9c] text-gray-600 outline-gray-600"
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
          <div className="flex h-[284px] w-full items-center justify-center">
            <p className="text-[18px] text-red-500">
              Erro ao carregar repasses
            </p>
          </div>
        ) : isPending ? (
          <div className="flex flex-wrap gap-8">
            {Array(6)
              .fill(0)
              .map((_, i) => {
                return <Posts key={i} isLoading={true} />;
              })}
          </div>
        ) : data.requests?.length > 0 ? (
          <div className="flex flex-wrap gap-8">
            {data.requests.map((post) => {
              return <Posts data={post} key={post.id} />;
            })}
          </div>
        ) : (
          <div className="flex h-[284px] w-full items-center justify-center">
            <p className="text-[18px]">Nenhuma publicação encontrada</p>
          </div>
        )}
        <Pagination totalPages={data?.totalPages} homePag={true} />
      </div>
    </div>
  );
}
