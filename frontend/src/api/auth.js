// user.js
import api from "./api.js";

// Hàm đăng ký
export async function register(username, email, password, role) {
    try {
        const response = await api.post("/user/register", { username, email, password, role });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// Hàm đăng nhập user thường
export async function login(email, password) {
    try {
        const response = await api.post("/user/login", { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// Kiểm tra role SELLER
export async function checkHaveSellerRole(email) {
    try {
        const response = await api.post("/user/check-seller-role", { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// Đăng nhập SELLER
export async function loginSeller(email, password) {
    try {
        const response = await api.post("/user/login-seller", { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
