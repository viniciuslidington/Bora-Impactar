import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api.js";

const getPedidos = async () => {
  const response = await api.get("/pedidos");
  return response.data;
};
const postPedidos = async () => {
  const response = await api.post("/pedidos");
  return response.data;
};
const putPedidos = async () => {
  const response = await api.put("/pedidos");
  return response.data;
};
const deletePedidos = async () => {
  const response = await api.delete("/pedidos");
  return response.data;
};

const usePedidos = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["pedidos"],
    queryFn: getPedidos,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

const useAddPedidos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postPedidos,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

const useEditPedidos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putPedidos,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

const useDelPedidos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePedidos,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

export { usePedidos, useAddPedidos, useEditPedidos, useDelPedidos };
