import axios from "axios";

const api = axios.create({
  baseURL: "http://hubdoacoesback/",
  withCredentials: true,
});

export default api;
