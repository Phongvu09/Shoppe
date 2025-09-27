import { USER_ROLE } from "../../common/constant/enum.js";
import Orders from "./order.model.js";

export const createOrderService = async (orderData) => {
    const order = await Orders.create(orderData);
    return order;
};

export const getAllOrdersService = async () => {
    const orders = await Orders.find();
    return orders;
};

export const getOrderByIdService = async (id) => {
    const order = await Orders.findById(id);
    return order;
};

export const deleteOrderService = async (id) => {
    const order = await Orders.findByIdAndDelete(id);
    return order;
};

export const updateOrderService = async (id, updateData) => {
    const order = await Orders.findByIdAndUpdate(id, updateData, { new: true });
    return order;
};

// Update status riêng biệt
export const updateOrderStatusService = async (id, newStatus, user) => {
    const order = await Orders.findById(id);
    if (!order) return null;

    // Nếu đơn đã delivered -> bất kỳ ai cũng không sửa được nữa
    if (order.status === "delivered") {
        throw new Error("Đơn hàng đã hoàn tất, không thể thay đổi trạng thái");
    }

    // Nếu Admin đã lock -> Seller/Buyer không sửa được
    if (order.isLockedByAdmin && user.role !== USER_ROLE.ADMIN) {
        throw new Error("Đơn hàng đã được admin xử lý, bạn không thể thay đổi");
    }

    // Nếu Admin sửa -> tự động lock đơn hàng
    if (user.role === USER_ROLE.ADMIN) {
        order.isLockedByAdmin = true;
    }

    // Cập nhật status
    order.status = newStatus;
    await order.save();

    return order;
};
