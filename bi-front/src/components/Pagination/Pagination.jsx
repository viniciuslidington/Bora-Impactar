import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQueryUpdate, useQueryUpdateHome } from "../../utils/queryUpdate";

const getPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages];
  } else if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  } else {
    return [1, "...", currentPage, "...", totalPages];
  }
};

const Pagination = ({ totalPages = 1, homePag = false }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Converte a string da URL em um objeto manipulável
  const queryPage = searchParams.get("page") || 1;
  const [currentPage, setCurrentPage] = useState(Number(queryPage));
  const updateQuery = useQueryUpdate();
  const updateQueryHome = useQueryUpdateHome();

  const onPageChange = (p) => {
    if (homePag) {
      updateQueryHome("page", p);
      return;
    }
    updateQuery("page", p);
  };

  const items = getPaginationItems(currentPage, totalPages);

  useEffect(() => {
    setCurrentPage(
      Number(new URLSearchParams(location.search).get("page") || 1),
    );
  }, [location.search]);

  return (
    <nav aria-label="pagination navigation" className="flex items-center gap-2">
      {/* Botão Anterior */}
      <button
        className="cursor-pointer rounded border-2 border-gray-300 bg-gray-300 px-3 py-1 text-gray-700 outline-gray-500 disabled:cursor-auto disabled:opacity-40"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {/* Itens de paginação */}
      {items.map((item, index) => (
        <span key={index}>
          {item === "..." ? (
            <span className="px-3 py-1">...</span>
          ) : (
            <button
              onClick={() => onPageChange(item)}
              className={`cursor-pointer rounded px-3 py-1 ${
                currentPage === item
                  ? "border-2 border-[#009fe3] bg-[#009fe3] text-white outline-white"
                  : "border-2 border-gray-300 text-gray-700 outline-gray-500 transition-colors duration-100 hover:border-[#009fe3] hover:bg-[#009fe3] hover:text-white"
              }`}
            >
              {item}
            </button>
          )}
        </span>
      ))}

      {/* Botão Próximo */}
      <button
        className="cursor-pointer rounded border-2 border-gray-300 bg-gray-300 px-3 py-1 text-gray-700 outline-gray-500 disabled:cursor-auto disabled:opacity-40"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </nav>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number,
  homePag: PropTypes.bool,
};

export default Pagination;
