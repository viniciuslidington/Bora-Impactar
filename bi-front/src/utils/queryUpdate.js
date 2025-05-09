import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const useQueryUpdate = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const queryUpdate = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);

    if (value) {
      updatedParams.set(key, value); // Adiciona ou atualiza o parâmetro
    } else {
      updatedParams.delete(key); // Remove se o valor for vazio
    }

    if (key !== "page") {
      updatedParams.set("page", 1); // Volta para pagina 1 ao mudar categoria ou urgencia
    }

    if (
      location.pathname.includes("/voluntario") &&
      location.pathname !== "/voluntario/search"
    ) {
      return navigate(`/voluntario/search?${updatedParams.toString()}`);
    }
    if (
      location.pathname.includes("/ong") &&
      location.pathname !== "/ong/search"
    ) {
      return navigate(`/ong/search?${updatedParams.toString()}`);
    }
    setSearchParams(updatedParams); // Atualiza a URL
    //Scroll para o topo da página
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return queryUpdate;
};
const useQueryUpdateHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryUpdate = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);

    if (value) {
      updatedParams.set(key, value); // Adiciona ou atualiza o parâmetro
    } else {
      updatedParams.delete(key); // Remove se o valor for vazio
    }

    if (key !== "page") {
      updatedParams.set("page", 1); // Volta para pagina 1 ao mudar sort
    }

    setSearchParams(updatedParams); // Atualiza a URL
  };

  return queryUpdate;
};
const useCleanFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryUpdate = () => {
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.delete("category"); // Remove category
    updatedParams.delete("urgency"); // Remove urgency

    updatedParams.set("page", 1); // Volta para pagina 1 ao remover categoria ou urgencia

    setSearchParams(updatedParams); // Atualiza a URL
  };

  return queryUpdate;
};

export { useQueryUpdate, useQueryUpdateHome, useCleanFilter };
