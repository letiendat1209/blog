// lib/http.js
import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000, // 10s default timeout
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Errors không nên trigger refresh
const NO_REFRESH_ERROR_CODES = [
  "INVALID_CREDENTIALS",
  "USER_BANNED",
  "ACCOUNT_LOCKED",
  "ACCOUNT_DELETED",
];

/* ================= RESPONSE INTERCEPTOR ================= */
http.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Không retry nếu là refresh endpoint
    if (originalRequest?.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // Không retry một số error codes cụ thể
    const errorCode = error.response?.data?.code;
    if (errorCode && NO_REFRESH_ERROR_CODES.includes(errorCode)) {
      return Promise.reject(error);
    }

    // Chỉ handle 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Nếu đang refresh, thêm vào queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new Error("Queue timeout"));
          }, 10000);

          failedQueue.push({
            resolve: () => {
              clearTimeout(timeoutId);
              resolve(http(originalRequest));
            },
            reject: (err) => {
              clearTimeout(timeoutId);
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh với timeout
        await http.post(
          "/auth/refresh",
          {},
          {
            timeout: 5000,
          }
        );

        processQueue(null);

        // Validate request trước khi retry
        if (!originalRequest || !originalRequest.url) {
          throw new Error("Invalid request config");
        }

        return http(originalRequest);
      } catch (err) {
        processQueue(err);

        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          const protectedPaths = ["/admin", "/dashboard", "/profile"];
          const isProtected = protectedPaths.some((path) =>
            currentPath.startsWith(path)
          );

          if (isProtected) {
            window.location.href = "/login";
          }
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default http;
