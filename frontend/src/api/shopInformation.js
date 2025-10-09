// api/shopInformation.js
import api from "./api.js";

// Lấy tất cả shop information
export async function getAllShopInformation() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get("/shop/", {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách shop:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// Lấy thông tin shop theo ID
export async function getShopInformationById(id) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get(`/shop/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy shop theo ID:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// Tạo thông tin shop
export async function createShopInformation(data) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.post("/shop/", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo shop:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// Cập nhật thông tin shop
export async function updateShopInformation(id, data) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.patch(`/shop/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật shop:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// Xóa thông tin shop
export async function deleteShopInformation(id) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.delete(`/shop/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error)
        console.error("Lỗi khi xóa shop:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}
