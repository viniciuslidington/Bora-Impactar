import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api.js";

const getRealocacoes = async () => {
  const response = await api.get("/Realocacoes");
  return response.data;
};
const postRealocacoes = async () => {
  const response = await api.post("/Realocacoes");
  return response.data;
};
const putRealocacoes = async () => {
  const response = await api.put("/Realocacoes");
  return response.data;
};
const deleteRealocacoes = async () => {
  const response = await api.delete("/Realocacoes");
  return response.data;
};

const useRealocacoes = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["Realocacoes"],
    queryFn: getRealocacoes,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

const useAddRealocacoes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postRealocacoes,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

const useEditRealocacoes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putRealocacoes,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

const useDelRealocacoes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRealocacoes,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

export {
  useRealocacoes,
  useAddRealocacoes,
  useEditRealocacoes,
  useDelRealocacoes,
};
