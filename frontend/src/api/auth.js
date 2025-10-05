// src/api/auth.js
import api from "./api.js";

// Gom thông điệp lỗi
function normalizeError(err) {
  const msg =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    "Có lỗi xảy ra";
  return new Error(msg);
}

// Đăng ký
export async function register({ username, email, password }) {
  try {
    const { data } = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return data; // { message, user?, access_token? } tuỳ BE
  } catch (err) {
    throw normalizeError(err);
  }
}

// Đăng nhập
export async function login(email, password) {
  try {
    const { data } = await api.post("/api/auth/login", { email, password });
    return data; // { access_token, user }
  } catch (err) {
    throw normalizeError(err);
  }
}

// Lấy thông tin user hiện tại (nếu BE có)
export async function getMe() {
  try {
    const { data } = await api.get("/api/auth/me");
    return data; // { user }
  } catch (err) {
    throw normalizeError(err);
  }
}

// Kiểm tra role seller theo email (nếu BE có)
export async function checkHaveSellerRole(email) {
  try {
    const { data } = await api.post("/api/auth/check-seller-role", { email });
    return data; // { isSeller: boolean, ... }
  } catch (err) {
    throw normalizeError(err);
  }
}

// Đăng nhập seller (nếu BE tách riêng)
export async function loginSeller(email, password) {
  try {
    const { data } = await api.post("/api/auth/login-seller", {
      email,
      password,
    });
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
}

// Đăng xuất (nếu BE có), đồng thời xoá token local
export async function logout() {
  try {
    await api.post?.("/api/auth/logout");
  } catch (_) {
    // ignore
  } finally {
    localStorage.removeItem("access_token");
  }
}
