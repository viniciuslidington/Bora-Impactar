import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const getSolicitacao = async (params) => {
  const response = await axios.get(
    `http://localhost:3000/search-solicitacao?${params}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
};
const getRepasse = async (params) => {
  const response = await axios.get(
    `http://localhost:3000/search-repasse?${params}`,
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
