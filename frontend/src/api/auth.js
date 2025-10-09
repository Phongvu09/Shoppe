import { USER_ROLE } from "../../../backend/common/constant/enum.js";
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
export async function register(username, email, password, role) {
  try {
    const roleArray = Array.isArray(role) ? role : [role];
    const { data } = await api.post("/user/register", {
      username,
      email,
      password,
      role: roleArray,
    });
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
}

// ----- SELLER -----
export async function registerSeller({ username, email, password }) {
  try {
    const { data } = await api.post("/auth/register-seller", {
      username,
      email,
      password,
      role: USER_ROLE.SELLER,
    });
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
}

// ----- LOGIN -----
export async function login(email, password) {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
}

// ----- GET CURRENT USER -----
export async function getMe() {
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
}

// ----- LOGOUT -----
export async function logout() {
  try {
    await api.post("/auth/logout");
  } catch (_) {
    // ignore
  } finally {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  }
}

// ----- LOGIN SELLER -----
export async function loginSeller(email, password) {
  try {
    const { data } = await api.post("/user/login-seller", { email, password });
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
}
