import api from "./api";

export async function getAllShopInformation() {
    try {
        const response = await api.get("/shop/");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function getShopInformationById(id) {
    try {
        const response = await api.get(`/shop/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export async function createShopInformation(data) {
    try {
        const response = await api.post("/shop/createShopInformation", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function updateShopInformation(id, data) {
    try {
        const response = await api.patch(`/shop/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export async function deleteShopInformation(id) {
    try {
        const response = await api.delete(`/identity/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}