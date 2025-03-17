import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api.js";

//Requisições

const fetchLogin = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};
const fetchLogout = async () => {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    throw new Error(
      `Logout failed: ${error.response?.status || error.message}`
    );
  }
};
const fetchUserData = async () => {
  const response = await api.get("auth");
  return response.data;
};

//Processamento das requisições com ReactQuery

const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchLogin,
    onSuccess: () => queryClient.invalidateQueries(["user"]),
  });
};
const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
    },
  });
};

const useUserData = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 10,
    retry: false,
    throwOnError: (error) => {
      // Se receber um erro 401 (não autorizado), define o usuário como não autenticado
      if (error.response && error.response.status === 401) {
        queryClient.setQueryData(["user"], null);
      }
    },
  });
};

export { useUserData, useLogin, useLogout };
