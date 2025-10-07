import { USER_ROLE } from "../../common/constant/enum.js";
import Order from "./orders.model.js"
import Product from "../products/product.model.js";
import mongoose from "mongoose";
import { calculateShippingFee } from "../../common/configs/shipping.config.js";

export const createOrderService = async (orderData, userId) => {
    let totalWeight = 0;

    for (const item of orderData.products) {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error(`Không tìm thấy sản phẩm: ${item.productId}`);
        totalWeight += (product.weight || 0) * item.quantity;
    }

    const shippingFee = calculateShippingFee(orderData.shippingMethod, totalWeight);

    const order = await Order.create({
        ...orderData,
        userId,
        totalWeight,
        shippingFee,
        status: "pending",
    });

    return order;
};


export const getAllOrdersService = async () => {
    const orders = await Order.find();
    return orders;
};

export const getOrderByIdService = async (id) => {
    const order = await Order.findById(id);
    return order;
}

export const getOrderByshopIdService = async (shopId) => {
    const order = await Order.find({ shopId });
    return order;
};

export const getOrdersByOrderIdService = async (orderId) => {
    const orders = await Order.find({ _id: orderId });
    return orders;
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

        // Nếu bị admin lock thì chỉ admin mới sửa được
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
            order.confirmedAt = new Date();
        }

        // Nếu sang processed (đã bàn giao cho vận chuyển)
        if (newStatus === "processed") {
            order.shippedAt = new Date();
        }

        // Nếu sang delivered (giao thành công)
        if (newStatus === "delivered") {
            order.deliveredAt = new Date();
        }

        // Nếu sang canceled
        if (newStatus === "canceled") {
            order.canceledAt = new Date();
        }

        // Nếu admin đổi trạng thái thì lock lại
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


export const confirmOrderService = async (id, user) => {
    const order = await Order.findById(id);
    if (!order) throw new Error("Đơn hàng không tồn tại");

    if (order.status !== "pending") {
        throw new Error("Đơn hàng không ở trạng thái chờ xác nhận");
    }

    const updatedOrder = await updateOrderStatusService(id, "waiting_pickup", user);
    updatedOrder.confirmedAt = new Date();
    await updatedOrder.save();
    return updatedOrder;
};




export const getWaitingPickupOrdersService = async (shopId) => {
    try {
        // Lấy tất cả order thuộc shop có status = "waiting_pickup"
        const orders = await Order.find({
            shopId: shopId,            // hoặc userId nếu bạn muốn lọc theo người mua
            status: "waiting_pickup"
        })
            .populate("products.productId")   // nếu muốn populate sản phẩm
            .populate("userId", "username email") // populate thông tin user
            .sort({ createdAt: 1 });        // sắp xếp mới nhất

        return orders;
    } catch (error) {
        console.error("Error in getWaiting_pickupOrderService:", error);
        throw new Error("Không thể lấy danh sách đơn hàng chờ lấy");
    }
};

export const getPendingOrdersService = async (shopId) => {
    try {
        console.log("shopId in service:", shopId);
        // Chuyển shopId sang ObjectId
        // Lấy tất cả order thuộc shop có status = "waiting_pickup"
        const orders = await Order.find({
            shopId: shopId,            // hoặc userId nếu bạn muốn lọc theo người mua
            status: "pending"
        })
            .populate("products.productId")   // nếu muốn populate sản phẩm
            .populate("userId", "username email") // populate thông tin user
            .sort({ createdAt: 1 });        // sắp xếp mới nhất
        console.log("shopId in service:", shopId);
        console.log("orders in service:", orders);
        return orders;
    } catch (error) {
        console.error("Error in getWaiting_pickupOrderService:", error);
        throw new Error("Không thể lấy danh sách đơn hàng chờ lấy");
    }
};


export const getDeliveredOrdersService = async (id) => {
    try {
        // Lấy tất cả order thuộc shop có status = "delivered"
        const orders = await Order.find({
            shopId: id,            // hoặc userId nếu bạn muốn lọc theo người mua
            status: "delivered"
        })
            .populate("products.productId")   // nếu muốn populate sản phẩm
            .populate("userId", "username email") // populate thông tin user
            .sort({ createdAt: 1 });        // sắp xếp mới nhất

        return orders;
    } catch (error) {
        console.error("Error in getWaiting_pickupOrderService:", error);
        throw new Error("Không thể lấy danh sách đơn hàng chờ lấy");
    }
};

// 📦 Lấy danh sách đơn hàng của người mua (buyer)
export const getMyOrdersService = async (userId) => {
    try {
        const orders = await Order.find({ userId })
            .populate("products.productId")   // hiện thông tin sản phẩm
            .populate("shopId", "shopName email") // hiện thông tin shop
            .sort({ createdAt: -1 }); // mới nhất trước

        return orders;
    } catch (error) {
        console.error("Error in getMyOrdersService:", error);
        throw new Error("Không thể lấy danh sách đơn hàng của bạn");
    }
};
