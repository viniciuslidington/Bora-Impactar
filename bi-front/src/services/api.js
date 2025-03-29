import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3017",
  withCredentials: true,
});

export default api;
