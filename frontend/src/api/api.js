// src/api/api.js
import axios from "axios";

// Đọc & chuẩn hoá baseURL
const raw = (import.meta.env.VITE_API_URL || "").trim();
const baseURL = (raw && raw.replace(/\/+$/, "")) || "http://localhost:5000";

console.log("[API baseURL]", baseURL);

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // nếu BE dùng cookie
});

// Gắn token nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 => xoá token + điều hướng về /login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("access_token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
