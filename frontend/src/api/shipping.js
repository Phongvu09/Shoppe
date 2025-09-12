import api from "./api";

export async function getAllShippingInformation
    () {
    try {
        const response = await api.get("/shop/");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function getShippingInformationById(id) {
    try {
        const response = await api.get(`/shop/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export async function createShippingInformation(data) {
    try {
        const response = await api.post("/shop/createShopInformation", data);
        return response.data;
    }
    catch (error) {
        throw error.response?.data || error.message;
    }
}
export async function updateShippingInformation(id, data) {
    try {
        const response = await api.patch(`/shop/${id}`, data);
        return response.data;
    }
    catch (error) {
        throw error.response?.data || error.message;
    }
}
export async function deleteShippingInformation(id) {
    try {
        const response = await api.delete(`/shop/${id}`);
        return response.data;
    }
    catch (error) {
        throw error.response?.data || error.message;
    }
}