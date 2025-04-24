import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import api from "./api";

// Não uso a api porque quero fazer a requisição sem cookies no solicitacao

const getSolicitacao = async (params) => {
  const response = await api.get(
    `/api/search-solicitacao?${params}`, // Corrigido para URL absoluta
  );
  return response.data;
};
const getRepasse = async (params) => {
  const response = await api.get(
    `/api/search-repasse?${params}`, // Corrigido para URL absoluta
    {
      withCredentials: true,
    },
  );
  return response.data;
};
const getSolicitacaoById = async (params) => {
  const response = await api.get(
    `/api/search-solicitacaobyid?${params}`, // Corrigido para URL absoluta
  );
  return response.data;
};
const getRepasseById = async (params) => {
  const response = await api.get(
    `/api/search-repassebyid?${params}`, // Corrigido para URL absoluta
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

const useSolicitacaoById = () => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams).toString();

  return useQuery({
    queryKey: ["solicitacaobyid", params],
    queryFn: () => getSolicitacaoById(params),
    enabled: !!params, // Evita requisições desnecessárias quando params está vazio
  });
};

const useRepasseById = () => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams).toString();

  return useQuery({
    queryKey: ["repassebyid", params],
    queryFn: () => getRepasseById(params),
    enabled: !!params, // Evita requisições desnecessárias quando params está vazio
  });
};

export {
  useSearchRepasse,
  useSearchSolicitacao,
  useSolicitacaoById,
  useRepasseById,
};
