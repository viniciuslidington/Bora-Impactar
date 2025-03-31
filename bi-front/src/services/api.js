import axios from "axios";

const api = axios.create({
  baseURL: "/hubdoacoesback/",
  withCredentials: true,
});

export default api;
