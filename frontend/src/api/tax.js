import api from "./api";
export const getAllTax = async () => {
    const response = await api.get("/tax");
    return response.data;
}
export const getTaxById = async (id) => {
    const response = await api.get(`/tax/${id}`);
    return response.data;
}
export const createTax = async (taxData) => {
    const response = await api.post("/tax", taxData);
    return response.data;
}
export const updateTax = async (id, taxData) => {
    const response = await api.put(`/tax/${id}`, taxData);
    return response.data;
}
export const deleteTax = async (id) => {
    const response = await api.delete(`/tax/${id}`);
    return response.data;
}
