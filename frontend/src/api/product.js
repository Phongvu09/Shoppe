import api from "./api.js"; // Đảm bảo bạn có file api.js cấu hình axios

export async function getAllProducts() {
    try {
        const response = await api.get("/product/");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}