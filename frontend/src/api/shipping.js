import api from "./api.js";

// GET tất cả shipping
export async function getAllShippingInformation() {
    const response = await api.get("/shipping/");
    return response.data;
}

// GET theo ID
export async function getShippingInformationById(id) {
    const response = await api.get(`/shipping/${id}`);
    return response.data;
}

// CREATE shipping

export async function createShippingInformation(data) {
    try {
        const token = localStorage.getItem("token");
        const response = await api.post("/shipping", data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}


// UPDATE shipping
export async function updateShippingInformation(id, data) {
    const token = localStorage.getItem("accessToken");
    const response = await api.patch(`/shipping/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

// DELETE shipping
export async function deleteShippingInformation(id) {
    const token = localStorage.getItem("accessToken");
    const response = await api.delete(`/shipping/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}
