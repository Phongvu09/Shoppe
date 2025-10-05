import api from "./api.js"; // Đảm bảo bạn có file api.js cấu hình axios

export async function getAllProducts() {
    try {
        const response = await api.get("/product/");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// api/product.js
export async function getProductsByShop(page = 1, limit = 10) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get(`/product/my-shop?page=${page}&limit=${limit}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}


export async function getProductById(id) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get(`/product/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const createProduct = async (productData) => {
    try {
        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("description", productData.description);
        formData.append("colors", productData.colors || ""); // Xử lý trường hợp undefined
        formData.append("sizes", productData.sizes || ""); // Xử lý trường hợp undefined
        formData.append("origin", productData.origin || "");
        formData.append("weight", productData.weight || 0);
        formData.append("category", productData.category || "");
        formData.append("price", productData.price || 0);
        formData.append("stock", productData.stock || 0);

        // Thêm shopId từ token (nếu cần)
        const token = localStorage.getItem("accessToken");

        // Chỉ append file mới
        if (productData.images && productData.images.length > 0) {
            productData.images.forEach(file => formData.append("images", file));
        }


        const res = await api.post("/product/", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return res.data;
    } catch (err) {
        console.log(err)
        console.error("Lỗi khi tạo product:", err.response?.data || err.message);
        throw err.response?.data || err.message;
    }
};

export async function updateProduct(id, productData) {
    try {
        const formData = new FormData();

        formData.append("name", productData.name);
        formData.append("description", productData.description);
        formData.append("colors", productData.colors || "");
        formData.append("sizes", productData.sizes || "");
        formData.append("origin", productData.origin || "");
        formData.append("weight", productData.weight || 0);
        formData.append("category", productData.category || "");
        formData.append("price", productData.price || 0);
        formData.append("stock", productData.stock || 0);

        // Chỉ upload ảnh mới
        if (productData.newImages && productData.newImages.length > 0) {
            productData.newImages.forEach(file => {
                formData.append("images", file);
            });
        }

        const token = localStorage.getItem("accessToken");
        const response = await api.patch(`/product/${id}`, formData, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (err) {
        console.error("Lỗi khi cập nhật product:", err.response?.data || err.message);
        throw err.response?.data || err.message;
    }
}


export async function deleteProduct(id) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.delete(`/product/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error.response?.data || error.message);
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