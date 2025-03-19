import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api.js";

const getSolicitacoes = async () => {
  const response = await api.get("/Solicitacoes");
  return response.data;
};
const postSolicitacoes = async (conteudo) => {
  const response = await api.post("/Solicitacoes", conteudo);
  return response.data;
};
const putSolicitacoes = async (conteudo) => {
  const response = await api.put("/Solicitacoes", conteudo);
  return response.data;
};
const deleteSolicitacoes = async (id) => {
  const response = await api.delete("/Solicitacoes", id);
  return response.data;
};

const useSolicitacoes = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["Solicitacoes"],
    queryFn: getSolicitacoes,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

const useAddSolicitacoes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postSolicitacoes,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

const useEditSolicitacoes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putSolicitacoes,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

const useDelSolicitacoes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSolicitacoes,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

export {
  useSolicitacoes,
  useAddSolicitacoes,
  useEditSolicitacoes,
  useDelSolicitacoes,
};
