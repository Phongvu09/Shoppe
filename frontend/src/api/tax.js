// src/api/taxInformation.js
import api from "./api.js";

// Lấy tất cả thuế
export async function getAllTaxInformation() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get("/tax/", {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách thuế:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// Lấy thuế theo ID
export async function getTaxInformationById(id) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get(`/tax/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thuế theo ID:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// Tạo mới thuế
export async function createTaxInformation(data) {
    try {
        const token = localStorage.getItem("accessToken");
        const shopId = localStorage.getItem("shopId"); // ✅ Lấy shopId từ local
        if (!shopId) throw new Error("Không tìm thấy shopId trong localStorage");

        const payload = { ...data, shopId };

        const response = await api.post("/tax/", payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo thuế:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// Cập nhật thuế
export async function updateTaxInformation(id, data) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.patch(`/tax/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật thuế:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// Xóa thuế
export async function deleteTaxInformation(id) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.delete(`/tax/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa thuế:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}
