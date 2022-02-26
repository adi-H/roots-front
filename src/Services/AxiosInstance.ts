import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://localhost:9000/api/",
  timeout: 2000,
});
