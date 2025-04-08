import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "../contexts/ModalContext";
import xImg from "../../assets/x.svg";
import {
  fetchImages,
  getPexelsImageAsFile,
} from "../../services/pexelsService";
import { useQuery } from "@tanstack/react-query";
import { formatarString3 } from "../../utils/formatString";

export default function ModalImageOnline({ handleImageChange }) {
  const modalOverlay = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { setModalImageOnline } = useContext(ModalContext);

  const search = formatarString3(searchTerm);
  // Query para buscar imagens no Pexels
  const {
    data: searchResults,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["pexelsImages", searchTerm],
    queryFn: () => fetchImages(search),
    staleTime: 1000 * 60 * 5,
    enabled: !!searchTerm.trim(), // Só executa a busca se houver um termo válido
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const currentPageResults = () => {
    const startIndex = (currentPage - 1) * 6;
    const endIndex = currentPage * 6;
    return searchResults.slice(startIndex, endIndex);
  };
  const currentPageResultsMobile = () => {
    const startIndex = (currentPage - 1) * 4;
    const endIndex = currentPage * 4;
    return searchResults.slice(startIndex, endIndex);
  };

  // Atualiza o estado `isMobile` quando a largura da tela muda
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setCurrentPage(1);
    };

    window.addEventListener("resize", handleResize); // Adiciona o listener
    return () => {
      window.removeEventListener("resize", handleResize); // Remove o listener ao desmontar
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(0,0,0,0.25)] p-2"
      onMouseDown={(e) => {
        modalOverlay.current === e.target && setModalImageOnline(null);
      }}
      ref={modalOverlay}
    >
      <div className="relative z-21 flex min-h-[498px] w-full flex-col gap-6 rounded bg-white p-4 lg:h-[576px] lg:w-auto lg:p-10">
        <img
          src={xImg}
          alt=""
          className="absolute top-3 right-3 h-5 w-5 cursor-pointer"
          onClick={() => setModalImageOnline(false)}
        />

        <span className="flex w-full justify-between">
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }
            }}
            className={
              "h-10 w-1/2 rounded-sm border-none bg-[#eaeaea] p-3 text-base"
            }
            placeholder="Pesquisar"
          />
          {searchResults && !isMobile && (
            <div className="flex gap-2">
              <button
                className="cursor-pointer rounded border-2 border-gray-300 bg-gray-300 px-3 py-1 text-gray-700 outline-gray-500 disabled:cursor-auto disabled:opacity-40"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <p
                className={
                  "flex w-9 cursor-pointer items-center justify-center rounded border-2 border-[#009fe3] bg-[#009fe3] px-3 py-1 text-white outline-white"
                }
              >
                {currentPage}
              </p>
              <button
                className="cursor-pointer rounded border-2 border-gray-300 bg-gray-300 px-3 py-1 text-gray-700 outline-gray-500 disabled:cursor-auto disabled:opacity-40"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === 4}
              >
                &gt;
              </button>
            </div>
          )}
        </span>

        <div className="flex h-full w-full flex-wrap justify-between gap-4 lg:w-[664px] lg:justify-baseline lg:gap-8">
          {isFetching ? (
            <div className="flex h-full min-h-[364px] w-full items-center justify-center">
              <l-ring-2
                size="64"
                stroke="6"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8"
                color="#009fe3;"
              ></l-ring-2>
            </div>
          ) : isError ? (
            <span className="flex h-full min-h-[364px] w-full flex-col items-center justify-center">
              <p className="text-center font-medium text-red-400">
                Erro ao buscar imagens online! Tente novamente.
              </p>
            </span>
          ) : searchResults > 1 && isMobile ? (
            currentPageResultsMobile().map((img) => (
              <img
                key={img.id}
                src={img.src.medium}
                alt={img.alt}
                className="aspect-square w-[calc(50%-8px)] max-w-[200px] cursor-pointer rounded object-cover"
                onClick={async () => {
                  const file = await getPexelsImageAsFile(img.src.large);
                  handleImageChange({ target: { files: [file] } });
                }}
              />
            ))
          ) : searchResults > 1 ? (
            currentPageResults().map((img) => (
              <img
                key={img.id}
                src={img.src.medium}
                alt={img.alt}
                className="h-[200px] w-[200px] cursor-pointer rounded object-cover"
                onClick={async () => {
                  const file = await getPexelsImageAsFile(img.src.large);
                  handleImageChange({ target: { files: [file] } });
                }}
              />
            ))
          ) : searchResults ? (
            <span className="flex h-full min-h-[364px] w-full flex-col items-center justify-center">
              <p className="text-center font-medium">
                Não foi possivel encontrar resultados de &quot;{searchTerm}
                &quot;
              </p>
            </span>
          ) : (
            <span className="flex h-full min-h-[364px] w-full flex-col items-center justify-center">
              <a href="https://www.pexels.com" className="underline">
                Fotos fornecidas pelo Pexels.
              </a>
              <p className="font-semibold">
                Aviso: Resultados podem ser imprecisos!
              </p>
            </span>
          )}
        </div>
        {searchResults && isMobile && (
          <div className="flex justify-end gap-2">
            <button
              className="cursor-pointer rounded border-2 border-gray-300 bg-gray-300 px-3 py-1 text-gray-700 outline-gray-500 disabled:cursor-auto disabled:opacity-40"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <p
              className={
                "flex w-9 cursor-pointer items-center justify-center rounded border-2 border-[#009fe3] bg-[#009fe3] px-3 py-1 text-white outline-white"
              }
            >
              {currentPage}
            </p>
            <button
              className="cursor-pointer rounded border-2 border-gray-300 bg-gray-300 px-3 py-1 text-gray-700 outline-gray-500 disabled:cursor-auto disabled:opacity-40"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === 6}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

ModalImageOnline.propTypes = {
  handleImageChange: PropTypes.func,
};
