import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api.js";

//Requisições

const fetchLogin = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};
const fetchLogout = async () => {
  return await api.post("/logout");
};
const fetchUserData = async () => {
  const response = await api.get("auth");
  console.log(response.data);
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
      queryClient.invalidateQueries(["user"]);
    },
  });
};

const useUserData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchInterval: 1000 * 60 * 15,
  });
};

export { useUserData, useLogin, useLogout };
