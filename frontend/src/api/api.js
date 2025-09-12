// api.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000", // backend endpoint
    timeout: 5000,
    headers: { "Content-Type": "application/json" }
});

export default api;

