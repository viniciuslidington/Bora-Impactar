import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserData } from "./authService.js";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: true,
});

const getRepasse = async (id) => {
  const response = await api.get("/repasse", {
    params: { ong_Id: id },
  });
  return response.data;
};
const postRepasse = async (content) => {
  const response = await api.post("/repasse", content);
  return response.data;
};
const putRepasse = async (content) => {
  const response = await api.put("/repasse", content, {
    params: { id: content.id },
  });
  return response.data;
};
const deleteRepasse = async (id) => {
  const response = await api.delete("/repasse", { params: { id: id } });
  return response.data;
};

const useRepasse = () => {
  const { data } = useUserData();

  return useQuery({
    queryKey: ["Repasse"],
    queryFn: () => getRepasse(data?.userData.ngo.id),
  });
};

// para erros no useQuery
export const useHandleError = () => {
  const queryClient = useQueryClient();
  return (error) => {
    if (error?.response && error?.response.status === 401) {
      queryClient.setQueryData(["user"], null);
      toast.error("Sessão expirada, por favor, faça login novamente.");
    } else {
      toast.error(
        error?.response?.data?.message || "Erro ao carregar repasses!",
      );
    }
  };
};

const useAddRepasse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postRepasse,
    onError: (error) => {
      // Verifica se o erro possui uma resposta e um código de status 401
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
        toast.error("Sessão expirada, por favor, faça login novamente.");
      } else {
        // Para outros erros, exibe uma mensagem de erro geral
        toast.error(
          error?.response?.data?.message ||
            "Erro ao criar repasse! Tente novamente.",
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Repasse"]);
    },
  });
};

const useEditRepasse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putRepasse,
    onError: (error) => {
      // Verifica se o erro possui uma resposta e um código de status 401
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
        toast.error("Sessão expirada, por favor, faça login novamente.");
      } else {
        // Para outros erros, exibe uma mensagem de erro geral
        toast.error(
          error?.response?.data?.message ||
            "Erro ao salvar repasse! Tente novamente.",
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Repasse"]);
    },
  });
};

const useDelRepasse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRepasse,
    onError: (error) => {
      // Verifica se o erro possui uma resposta e um código de status 401
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
        toast.error("Sessão expirada, por favor, faça login novamente.");
      } else {
        // Para outros erros, exibe uma mensagem de erro geral
        toast.error(
          error?.response?.data?.message ||
            "Erro ao encerrar repasse! Tente novamente.",
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Repasse"]);
    },
  });
};

export { useRepasse, useAddRepasse, useEditRepasse, useDelRepasse };
