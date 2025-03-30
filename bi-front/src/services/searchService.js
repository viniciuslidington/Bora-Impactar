import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

// Não uso a api porque quero fazer a requisição sem cookies no solicitacao

const getSolicitacao = async (params) => {
  const response = await axios.get(
    `http://localhost:3017/api/search-solicitacao?${params}`, // Adicionado /api
  );
  return response.data;
};
const getRepasse = async (params) => {
  const response = await axios.get(
    `http://localhost:3017/api/search-repasse?${params}`, // Adicionado /api
    {
      withCredentials: true,
    },
  );
  return response.data;
};

const useSearchSolicitacao = () => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams).toString();

  return useQuery({
    queryKey: ["search-solicitacao", params],
    queryFn: () => getSolicitacao(params),
  });
};
const useSearchRepasse = () => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams).toString();

  return useQuery({
    queryKey: ["search-repasse", params],
    queryFn: () => getRepasse(params),
  });
};

export { useSearchRepasse, useSearchSolicitacao };
