import api from "./api";
export const getAllIdentity = async () => {
    const response = await api.get("/identity");
    return response.data;
}
export const getIdentityById = async (id) => {
    const response = await api.get(`/identity/${id}`);
    return response.data;
}
export const createIdentity = async (identityData) => {
    const response = await api.post("/identity", identityData);
    return response.data;
}
export const updateIdentity = async (id, identityData) => {
    const response = await api.put(`/identity/${id}`, identityData);
    return response.data;
}
export const deleteIdentity = async (id) => {
    const response = await api.delete(`/identity/${id}`);
    return response.data;
}