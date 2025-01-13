import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ?`${import.meta.env.VITE_BACKEND_URL}/api/v1`: "/api/vi",
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token; 
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export default axiosInstance;