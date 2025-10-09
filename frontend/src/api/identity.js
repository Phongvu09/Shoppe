// src/api/identity.js
import api from "./api.js";

// Lấy tất cả định danh
export async function getAllIdentity() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get("/identity", {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách định danh:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// Lấy định danh theo ID
export async function getIdentityById(id) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get(`/identity/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy định danh theo ID:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// Tạo mới định danh (có upload file)
export async function createIdentity(data) {
    try {
        const token = localStorage.getItem("accessToken");
        const shopId = localStorage.getItem("shopId");
        if (!shopId) throw new Error("Không tìm thấy shopId trong localStorage");

        const payload = new FormData();
        payload.append("shopId", shopId);
        for (const key in data) {
            if (["frontImage", "backImage", "selfieImage"].includes(key) && data[key]) {
                payload.append(key, data[key]);
            } else if (key === "address" && data[key]) {
                Object.entries(data.address).forEach(([k, v]) => payload.append(`address[${k}]`, v));
            } else {
                payload.append(key, data[key]);
            }
        }

        const response = await api.post("/identity", payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo định danh:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// Cập nhật định danh (có upload file)
export async function updateIdentity(id, data) {
    try {
        const token = localStorage.getItem("accessToken");

        const payload = new FormData();
        for (const key in data) {
            if (["frontImage", "backImage", "selfieImage"].includes(key) && data[key]) {
                payload.append(key, data[key]);
            } else if (key === "address" && data[key]) {
                Object.entries(data.address).forEach(([k, v]) => payload.append(`address[${k}]`, v));
            } else {
                payload.append(key, data[key]);
            }
        }

        const response = await api.put(`/identity/${id}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật định danh:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// Xóa định danh
export async function deleteIdentity(id) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.delete(`/identity/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa định danh:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}
