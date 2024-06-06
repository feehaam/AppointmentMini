import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "http://localhost",
});

AxiosInstance.interceptors.request.use((config) => {
  // console.log("Calling api");
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = "Bearer " + `${token}`;
  }

  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    // console.log("Api call done");
    return response;
  },
  (error) => {
    // console.error("Error:", error);
    // console.log("Api call done with error");
    return Promise.reject(error);
  }
);

export default AxiosInstance;
