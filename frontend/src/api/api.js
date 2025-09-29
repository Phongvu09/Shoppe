// src/api/api.js  (đúng với cấu trúc hiện tại của anh)
import axios from "axios";

// Làm sạch baseURL để tránh lỗi / hoặc :5000 dư
const raw = (import.meta.env.VITE_API_URL || "").trim();
const base = raw.replace(/\/+$/, "") || "http://localhost:5000";

console.log("[API baseURL]", base);

const api = axios.create({
  baseURL: base,
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

// 401 → xoá token + đẩy về /login
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
