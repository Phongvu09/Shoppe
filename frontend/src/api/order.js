// api/order.js
import api from "./api.js"; // axios instance

// ==================================================
// 🧾 1️⃣ ORDER CHUNG (buyer + seller + admin)
// ==================================================

// 🛒 Tạo đơn hàng (buyer)
export async function createOrder(orderData) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.post("/order/", orderData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi tạo đơn hàng:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// 📋 Lấy tất cả đơn hàng (admin)
export async function getAllOrders() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get("/order/", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách đơn hàng:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// 🔍 Lấy chi tiết đơn hàng theo shop hoặc id
export async function getOrderById(id) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get(`/order/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi lấy chi tiết đơn hàng:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}
export async function getOrderByShopId(shopId) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get(`/order/shop/${shopId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi lấy chi tiết đơn hàng:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// ✏️ Cập nhật đơn hàng (ví dụ thay đổi địa chỉ)
export async function updateOrder(id, updateData) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.patch(`/order/${id}`, updateData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật đơn hàng:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// 🗑️ Xóa đơn hàng
export async function deleteOrder(id) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.delete(`/order/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi xóa đơn hàng:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// ==================================================
// 🚚 2️⃣ SELLER / ADMIN QUẢN LÝ
// ==================================================

// 🔄 Cập nhật trạng thái đơn hàng (seller/admin)
export async function updateOrderStatus(id, newStatus) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.patch(
            `/order/${id}/status`,
            { newStatus },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật trạng thái:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// ✅ Seller xác nhận đơn hàng
export async function confirmOrder(id) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.patch(`/order/${id}/confirm`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi xác nhận đơn hàng:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// 🕒 Lấy danh sách đơn hàng chờ xác nhận
export async function getPendingOrders() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get("/order/pendingOrders/", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi lấy đơn hàng pending:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// 🚚 Lấy đơn hàng chờ lấy hàng
export async function getWaitingPickupOrders() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get("/order/waitingPickupOrders/", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi lấy đơn hàng chờ lấy:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// 📦 Lấy danh sách đơn hàng đã giao
export async function getDeliveredOrders() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get("/order/deliveredOrders/", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi lấy đơn hàng delivered:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// ==================================================
// 🧍‍♂️ 3️⃣ BUYER (Người mua)
// ==================================================

// 🛍️ Lấy danh sách đơn hàng của người mua
export async function getMyOrders() {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get("/order/my-orders", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi lấy đơn hàng của tôi:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// ❌ Hủy đơn hàng (buyer)
export async function cancelOrder(id) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.patch(
            `/order/${id}/status`,
            { newStatus: "canceled" },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi hủy đơn hàng:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}

// ⭐ Buyer xác nhận đã nhận hàng
export async function markOrderAsDelivered(id) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await api.patch(
            `/order/${id}/status`,
            { newStatus: "delivered" },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi xác nhận đã nhận hàng:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}
