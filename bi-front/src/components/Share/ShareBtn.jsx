import PropTypes from "prop-types";

export default function ShareBtn({ size = 38, className, title }) {
  const handleShare = async () => {
    const url = new URL(window.location.href);
    const postParam = url.searchParams.get("post");
    const shareUrl = postParam
      ? `${url.origin}${url.pathname}?post=${postParam}`
      : url.origin;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Erro ao compartilhar:", err);
      }
    } else {
      // Fallback: copiar link
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copiado para a área de transferência!");
      } catch {
        alert("Seu navegador não suporta compartilhamento nem copiar link.");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`z-50 cursor-pointer ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={`${size}`}
        height={`${size}`}
        x="0"
        y="0"
        viewBox="0 0 48 48"
      >
        <g>
          <path
            d="M35.274 15.838H31.18a1.5 1.5 0 1 0 0 3h4.095c.827 0 1.5.673 1.5 1.5v19.616c0 .827-.673 1.5-1.5 1.5H12.726c-.827 0-1.5-.673-1.5-1.5V20.338c0-.827.673-1.5 1.5-1.5h4.095a1.5 1.5 0 1 0 0-3h-4.095a4.505 4.505 0 0 0-4.5 4.5v19.616c0 2.481 2.019 4.5 4.5 4.5h22.549c2.481 0 4.5-2.019 4.5-4.5V20.338a4.506 4.506 0 0 0-4.501-4.5zM18.407 12.81l4.143-4.143v19.748a1.5 1.5 0 1 0 3 0V8.667l4.143 4.143c.293.293.677.439 1.061.439s.768-.146 1.061-.439a1.5 1.5 0 0 0 0-2.121l-6.703-6.704a1.5 1.5 0 0 0-2.122 0l-6.704 6.704a1.5 1.5 0 1 0 2.121 2.121z"
            fill="#232323"
            opacity="1"
            data-original="#232323"
          ></path>
        </g>
      </svg>
    </button>
  );
}

ShareBtn.propTypes = {
  title: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};
