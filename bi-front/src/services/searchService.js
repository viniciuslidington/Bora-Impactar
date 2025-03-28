import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

// Não uso a api porque quero fazer a requisição sem cookies no solicitacao

const getSolicitacao = async (params) => {
  const response = await axios.get(
    `http://localhost:3017/search-solicitacao?${params}`,
  );
  return response.data;
};
const getRepasse = async (params) => {
  const response = await axios.get(
    `http://localhost:3017/search-repasse?${params}`,
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
