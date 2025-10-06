import * as orderService from "./order.service.js";
import { createResponse } from "../../common/configs/respone.config.js";
import { handleAsync } from "../../common/utils/handle-asynce.config.js";

export const createOrder = handleAsync(async (req, res) => {
    try {
        const order = await orderService.createOrderService(req.body);
        if (!order) return createResponse(res, 400, "Tạo đơn hàng thất bại");

        createResponse(res, 200, "Tạo đơn hàng thành công", order);
    } catch (error) {
        createResponse(res, 400, error.message || "Tạo đơn hàng thất bại");
    }
});
export const getAllOrders = handleAsync(async (req, res) => {
    const orders = await orderService.getAllOrdersService();
    if (!orders || orders.length === 0)
        return createResponse(res, 400, "Không tìm thấy đơn hàng");

    createResponse(res, 200, "Lấy danh sách đơn hàng thành công", orders);
});

export const getOrderById = handleAsync(async (req, res) => {
    const order = await orderService.getOrderByIdService(req.params.id);
    if (!order) return createResponse(res, 404, "Đơn hàng không tồn tại");

    createResponse(res, 200, "Lấy đơn hàng thành công", order);
});

export const deleteOrder = handleAsync(async (req, res) => {
    const order = await orderService.deleteOrderService(req.params.id);
    if (!order) return createResponse(res, 404, "Xóa đơn hàng thất bại");

    createResponse(res, 200, "Xóa đơn hàng thành công", order);
});

export const updateOrder = handleAsync(async (req, res) => {
    const order = await orderService.updateOrderService(req.params.id, req.body);
    if (!order) return createResponse(res, 400, "Cập nhật đơn hàng thất bại");

    createResponse(res, 200, "Cập nhật đơn hàng thành công", order);
});

// cập nhật trạng thái riêng
// orders.controller.js
export const updateOrderStatus = handleAsync(async (req, res) => {
    const { newStatus } = req.body;
    const { id } = req.params;

    // ✅ truyền req.user xuống service
    const order = await orderService.updateOrderStatusService(id, newStatus, req.user);

    if (!order) return createResponse(res, 400, "Cập nhật trạng thái thất bại");

    createResponse(res, 200, "Cập nhật trạng thái thành công", order);
});
