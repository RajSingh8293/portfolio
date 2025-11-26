import axios from "axios";

// export const BACKEND_URL = "http://localhost:2122";
export const BACKEND_URL = "https://portfolio-00cb.onrender.com";
export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});
