import PropTypes from "prop-types";

const Pagination = ({
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  showFirstButton = false,
  showLastButton = false,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="pagination navigation" className="flex gap-2">
      {/* Primeiro */}
      {showFirstButton && (
        <button
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
      )}

      {/* Anterior */}
      <button
        className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {/* Páginas */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded px-3 py-1 ${
            currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Próximo */}
      <button
        className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>

      {/* Último */}
      {showLastButton && (
        <button
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      )}
    </nav>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  showFirstButton: PropTypes.bool,
  showLastButton: PropTypes.bool,
};

export default Pagination;
