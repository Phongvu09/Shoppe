import { USER_ROLE } from "../../common/constant/enum.js";
import Order from "./orders.model.js"
import Product from "../products/product.model.js";
import mongoose from "mongoose";

export const createOrderService = async (orderData) => {
    const order = await Order.create(orderData);
    return order;
};

export const getAllOrdersService = async () => {
    const orders = await Orders.find();
    return orders;
};

export const getOrderByIdService = async (id) => {
    const order = await Order.findById(id);
    return order;
};

export const deleteOrderService = async (id) => {
    const order = await Order.findByIdAndDelete(id);
    return order;
};

export const updateOrderService = async (id, updateData) => {
    const order = await Order.findByIdAndUpdate(id, updateData, { new: true });
    return order;
};

// Update status riêng biệt
// order.service.js
export const updateOrderStatusService = async (id, newStatus, user) => {
    if (!user || !user.role) {
        throw new Error("Unauthorized: thiếu thông tin role");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const order = await Order.findById(id).session(session);
        if (!order) throw new Error("Đơn hàng không tồn tại");

        // Nếu đơn đã delivered -> khóa luôn
        if (order.status === "delivered") {
            throw new Error("Đơn hàng đã hoàn tất, không thể thay đổi");
        }

        // Admin lock
        if (order.isLockedByAdmin && user.role !== USER_ROLE.ADMIN) {
            throw new Error("Đơn hàng đã được admin xử lý, bạn không thể thay đổi");
        }

        // Nếu chuyển sang waiting_pickup -> trừ stock
        if (newStatus === "waiting_pickup") {
            for (const item of order.products) {
                const product = await Product.findById(item.productId).session(session);
                if (!product) throw new Error(`Không tìm thấy sản phẩm: ${item.productId}`);
                if (product.stock < item.quantity) {
                    throw new Error(`Sản phẩm ${product.name} không đủ hàng`);
                }

                product.stock -= item.quantity;
                product.soldQuantity += item.quantity;
                await product.save({ session });
            }
        }

        // Nếu admin sửa -> lock
        if (user.role === USER_ROLE.ADMIN) {
            order.isLockedByAdmin = true;
        }

        order.status = newStatus;
        await order.save({ session });

        await session.commitTransaction();
        session.endSession();
        return order;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
