// src/api/api.js
import axios from "axios";

// ✅ Lấy baseURL từ .env (VITE_API_URL), fallback về localhost:5000
const raw = (import.meta.env.VITE_API_URL || "").trim();
const baseURL = raw.replace(/\/+$/, "") || "http://localhost:5000";

console.log("[API baseURL]", baseURL);

// ✅ Khởi tạo instance axios
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // nếu cần cookie
});

// ✅ Gắn access_token vào header cho mỗi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Xử lý lỗi response (bỏ auto redirect tránh bị về trang login)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      console.warn("⚠️ Token hết hạn hoặc chưa đăng nhập, bỏ qua auto logout.");
      // ❌ Không redirect về login, chỉ xóa token nếu đang ở trang bảo mật
      const path = window.location.pathname;
      if (path.startsWith("/checkout") || path.startsWith("/seller")) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } else if (err?.code === "ECONNABORTED") {
      console.error("⏰ Request timeout:", err.message);
    } else if (!err.response) {
      console.error("🚫 Không kết nối được server:", err.message);
    }
    return Promise.reject(err);
  }
);

export default api;
