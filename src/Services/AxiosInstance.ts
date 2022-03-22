import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000/api/",
  timeout: 2000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response.status === 401) {
    }
    window.location.href = "/login";
  }
);

export { axiosInstance };
