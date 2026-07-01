import axios from "axios";
import { Platform } from "react-native";
import { LOG_SCOPE, Logger } from "./logger";

const apiUrl =
  Platform.OS === "web" ? "http://localhost:5555" : "http://192.168.0.103:5555";
// const apiUrl = 'https://bookquest-backend.onrender.com/api';

export const api = axios.create({
  baseURL: apiUrl,
  responseType: "json",
  withCredentials: true,
});

// api.interceptors.response.use(
//      response => response,
//      error => {
//       if (error.response) {
//         console.error('API error response:', error.response.status, error.response.data);
//       } else {
//         console.error('API error without response:', error.message);
//       }
//       return Promise.reject(error);
//      }
// );

api.interceptors.request.use((config) => {
  Logger.info(
    LOG_SCOPE.api,
    `${config.method?.toUpperCase()} ${config.url}`,
    config.data ?? config.params,
  );

  return config;
});

api.interceptors.response.use(
  (response) => {
    Logger.log(
      LOG_SCOPE.api,
      `${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
      // response.data,
    );

    return response;
  },
  (error) => {
    Logger.error(
      LOG_SCOPE.api,
      `${error.response?.status ?? "NETWORK"} ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
      error.response?.data ?? error.message,
    );

    return Promise.reject(error);
  },
);
