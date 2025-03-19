import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api.js";

const getRepasse = async () => {
  const response = await api.get("/Repasse");
  return response.data;
};
const postRepasse = async () => {
  const response = await api.post("/Repasse");
  return response.data;
};
const putRepasse = async () => {
  const response = await api.put("/Repasse");
  return response.data;
};
const deleteRepasse = async () => {
  const response = await api.delete("/Repasse");
  return response.data;
};

const useRepasse = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["Repasse"],
    queryFn: getRepasse,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

const useAddRepasse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postRepasse,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

const useEditRepasse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putRepasse,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

const useDelRepasse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRepasse,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

export { useRepasse, useAddRepasse, useEditRepasse, useDelRepasse };
