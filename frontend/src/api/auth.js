// user.js
import api from "./api.js"

// Hàm đăng nhập    
export async function register(username, email, password) {
    try {
        const response = await api.post("/auth/register", { username, email, password });
        return response.data;
    }
    catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function login(email, password) {
    try {
        const response = await api.post("/auth/login", { email, password });
        return response.data;
    }
    catch (error) {
        throw error.response?.data || error.message;
    }
}
