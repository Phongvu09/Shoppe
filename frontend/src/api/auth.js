// src/api/auth.js
import api from "./api.js";

function normalizeError(err) {
  const msg =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    "Có lỗi xảy ra";
  return new Error(msg);
}

// ----- USER -----
export async function register({ username, email, password }) {
  try {
    const { data } = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
}

// ----- SELLER -----
export async function registerSeller({ username, email, password }) {
  try {
    const { data } = await api.post("/api/auth/register-seller", {
      username,
      email,
      password,
    });
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
}

// ----- LOGIN -----
export async function login(email, password) {
  try {
    const { data } = await api.post("/api/auth/login", { email, password });
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
}

// ----- GET CURRENT USER -----
export async function getMe() {
  try {
    const { data } = await api.get("/api/auth/me");
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
}

// ----- LOGOUT -----
export async function logout() {
  try {
    await api.post("/api/auth/logout");
  } catch (_) {
    // ignore
  } finally {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  }
}
