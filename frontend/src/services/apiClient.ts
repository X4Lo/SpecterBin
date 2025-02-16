import axios from "axios";
import authService from "./authService";

console.log(import.meta.env);
const apiClient = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// apiClient.interceptors.request.use((config) => {
//   const accountNumber = LocalStorageService.getItem("accountNumber");
//   if (accountNumber) {
//     config.headers.Authorization = `Bearer ${accountNumber}`;
//   }
//   return config;
// });

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      authService.logout();
      // window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
