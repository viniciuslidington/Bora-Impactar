import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserData } from "./authService.js";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

const getSolicitacoes = async (id) => {
  const response = await api.get("/solicitacao", {
    params: { ong_Id: id },
  });
  return response.data;
};
const postSolicitacoes = async (content) => {
  const response = await api.post("/solicitacao", content);
  return response.data;
};
const putSolicitacoes = async (content) => {
  const response = await api.put("/solicitacao", content, {
    params: { id: content.id },
  });
  return response.data;
};
const deleteSolicitacoes = async (id) => {
  const response = await api.delete("/solicitacao", { params: { id: id } });
  return response.data;
};

const useSolicitacoes = () => {
  const { data } = useUserData();
  return useQuery({
    queryKey: ["Solicitacoes"],
    queryFn: () => getSolicitacoes(data?.userData.ngo.id),
  });
};

// para erros no useQuery
export const useHandleError = (error) => {
  const queryClient = useQueryClient();
  return (error) => {
    if (error?.response && error?.response.status === 401) {
      queryClient.setQueryData(["user"], null);
      toast.error("Sessão expirada, por favor, faça login novamente.");
    } else {
      toast.error(
        error?.response?.data?.message || "Erro ao carregar solicitações.",
      );
    }
  };
};

const useAddSolicitacoes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postSolicitacoes,
    onError: (error) => {
      // Verifica se o erro possui uma resposta e um código de status 401
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
        toast.error("Sessão expirada, por favor, faça login novamente.");
      } else {
        // Para outros erros, exibe uma mensagem de erro geral
        toast.error(
          error?.response?.data?.message ||
            "Erro ao criar solicitação. Tente novamente.",
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["solicitacoes"]);
    },
  });
};

const useEditSolicitacoes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putSolicitacoes,
    onError: (error) => {
      // Verifica se o erro possui uma resposta e um código de status 401
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
        toast.error("Sessão expirada, por favor, faça login novamente.");
      } else {
        // Para outros erros, exibe uma mensagem de erro geral
        toast.error(
          error?.response?.data?.message ||
            "Erro ao salvar solicitação. Tente novamente.",
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["solicitacoes"]);
    },
  });
};

const useDelSolicitacoes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSolicitacoes,
    onError: (error) => {
      // Verifica se o erro possui uma resposta e um código de status 401
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
        toast.error("Sessão expirada, por favor, faça login novamente.");
      } else {
        // Para outros erros, exibe uma mensagem de erro geral
        toast.error(
          error?.response?.data?.message ||
            "Erro ao encerrar solicitação. Tente novamente.",
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["solicitacoes"]);
    },
  });
};

export {
  useSolicitacoes,
  useAddSolicitacoes,
  useEditSolicitacoes,
  useDelSolicitacoes,
};
