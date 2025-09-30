import api from "./api.js"; // Đảm bảo bạn có file api.js cấu hình axios

export async function getAllProducts() {
    try {
        const response = await api.get("/product/");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export async function getProductById(id) {
    try {
        const response = await api.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }

}

export const createProduct = async (productData) => {
    try {
        const formData = new FormData();

        // append các field text
        formData.append("name", productData.name);
        formData.append("description", productData.description);
        formData.append("color", productData.color);
        formData.append("size", productData.size);
        formData.append("origin", productData.origin);
        formData.append("weight", productData.weight);
        formData.append("category", productData.category);
        formData.append("price", productData.price);
        formData.append("stock", productData.stock);

        // append file (ảnh)
        if (productData.images && productData.images.length > 0) {
            productData.images.forEach((file) => {
                formData.append("images", file);
            });
        }


        const res = await api.post("/product/", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return res.data;
    } catch (err) {
        console.error("Lỗi khi tạo product:", err);
        throw err;
    }
};


export async function updateProduct(id, data) {
    try {
        const response = await api.patch(`/product/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export async function deleteProduct(id) {
    try {
        const response = await api.delete(`/product/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function lockProduct(id, data) {
    try {
        const response = await api.patch(`/product/${id}/lock`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export async function unlockProduct(id, data) {
    try {
        const response = await api.patch(`/product/${id}/unlock`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}