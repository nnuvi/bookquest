import axios from "axios";
import { Platform } from "react-native";
import { LOG_SCOPE, logger } from "./logger";

// const apiUrl =
  // Platform.OS === "web" ? "http://localhost:5555" : "http://192.168.0.102:5555";
const apiUrl = 'https://bookquest-1kfq.onrender.com';

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
  logger.info(
    LOG_SCOPE.api,
    `${config.method?.toUpperCase()} ${config.url}`,
    config.data ?? config.params,
  );

  return config;
});

api.interceptors.response.use(
  (response) => {
    logger.log(
      LOG_SCOPE.api,
      `${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
      // response.data,
    );

    return response;
  },
  (error) => {
    logger.error(
      LOG_SCOPE.api,
      `${error.response?.status ?? "NETWORK"} ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
      error.response?.data ?? error.message,
    );

    return Promise.reject(error);
  },
);
