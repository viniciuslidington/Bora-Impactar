import Filter from "../components/Filter/Filter";
import SearchPostVol from "../components/SearchPosts/SearchPostVol";
import { useSolicitacoes } from "../services/userSolicitacoesService";

export default function SearchVol() {
  const { data, isPending } = useSolicitacoes();
  return (
    <div className="flex w-[1366px] gap-16 px-[123px] py-16">
      <div className="flex min-w-max flex-col gap-8">
        <span className="flex flex-col gap-1">
          <h3 className="text-2xl font-semibold opacity-95">
            Resultado da pesquisa
          </h3>
          <p className="text-[14px] opacity-90">
            321 solicitações de ongs foram encontradas
          </p>
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
      ) : data?.length > 0 ? (
        <div className="">
          <div className="flex flex-col gap-8">
            {data.map((post) => {
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
