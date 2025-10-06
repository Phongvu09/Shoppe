// src/api/api.js
import axios from "axios";

// Đọc biến môi trường Vite (nếu có)
const raw = (import.meta.env.VITE_API_URL || "").trim();

// Nếu .env không có, fallback về localhost:5000
const baseURL = raw.replace(/\/+$/, "") || "http://localhost:5000";

console.log("[API baseURL]", baseURL);

// Khởi tạo instance axios
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// 🧠 Thêm access_token vào header cho mỗi request (nếu có)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 🚨 Nếu BE trả 401 (hết hạn token) => xoá token + điều hướng login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
