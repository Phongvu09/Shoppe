import * as orderService from "./order.service.js";
import { createResponse } from "../../common/configs/respone.config.js";
import { handleAsync } from "../../common/utils/handle-asynce.config.js";

/* ===========================================
   🔹 Các hàm FE Shopee Lite cần dùng
=========================================== */

// ✅ Tạo đơn hàng (Checkout.jsx)
export const createOrder = handleAsync(async (req, res) => {
  try {
    const userId = req.user?.id; // lấy id từ token
    const order = await orderService.createOrderService(req.body, userId);

    if (!order) return createResponse(res, 400, "Tạo đơn hàng thất bại");
    createResponse(res, 200, "Tạo đơn hàng thành công", order);
  } catch (error) {
    createResponse(res, 400, error.message || "Tạo đơn hàng thất bại");
  }
});

// ✅ Lấy tất cả đơn hàng của user
export const getAllOrders = handleAsync(async (req, res) => {
  const userId = req.user?.id;
  const orders = await orderService.getAllOrdersService(userId);

  if (!orders || orders.length === 0)
    return createResponse(res, 400, "Không tìm thấy đơn hàng");

  createResponse(res, 200, "Lấy danh sách đơn hàng thành công", orders);
});

// ✅ Lấy đơn hàng theo shopId (seller)
export const getOrderByshopId = handleAsync(async (req, res) => {
  const shopId = req.user?.id;
  const order = await orderService.getOrderByshopIdService(shopId);

  if (!order) return createResponse(res, 404, "Đơn hàng không tồn tại");

  createResponse(res, 200, "Lấy đơn hàng thành công", order);
});

// ✅ Lấy đơn hàng theo userId
export const getOrderById = handleAsync(async (req, res) => {
  const userId = req.user?.id;
  const order = await orderService.getOrderByIdService(userId);

  if (!order) return createResponse(res, 404, "Đơn hàng không tồn tại");

  createResponse(res, 200, "Lấy đơn hàng thành công", order);
});

// ✅ Lấy đơn hàng theo orderId cụ thể
export const getOrderByOrderId = handleAsync(async (req, res) => {
  const { orderId } = req.params;
  const orders = await orderService.getOrdersByOrderIdService(orderId);
  if (!orders || orders.length === 0) {
    return createResponse(res, 404, "Không tìm thấy đơn hàng");
  }
  createResponse(res, 200, "Lấy đơn hàng thành công", orders);
});

// ✅ Xóa đơn hàng
export const deleteOrder = handleAsync(async (req, res) => {
  const userId = req.user?.id;
  const order = await orderService.deleteOrderService(req.params.id, userId);

  if (!order) return createResponse(res, 404, "Xóa đơn hàng thất bại");
  createResponse(res, 200, "Xóa đơn hàng thành công", order);
});

// ✅ Cập nhật đơn hàng
export const updateOrder = handleAsync(async (req, res) => {
  const userId = req.user?.id;
  const order = await orderService.updateOrderService(
    req.params.id,
    req.body,
    userId
  );

  if (!order) return createResponse(res, 400, "Cập nhật đơn hàng thất bại");
  createResponse(res, 200, "Cập nhật đơn hàng thành công", order);
});

// ✅ Cập nhật trạng thái đơn hàng riêng (admin/seller)
export const updateOrderStatus = handleAsync(async (req, res) => {
  const { newStatus } = req.body;
  const { id } = req.params;

  // gửi toàn bộ req.user (có id + role)
  const order = await orderService.updateOrderStatusService(
    id,
    newStatus,
    req.user
  );

  if (!order) return createResponse(res, 400, "Cập nhật trạng thái thất bại");
  createResponse(res, 200, "Cập nhật trạng thái thành công", order);
});

// ✅ Lấy danh sách đơn hàng chờ lấy (seller)
export const getWaitingPickupOrders = handleAsync(async (req, res) => {
  const shopId = req.user?.id;
  const orders = await orderService.getWaitingPickupOrdersService(shopId);

  if (!orders || orders.length === 0) {
    return createResponse(res, 404, "Không có đơn hàng chờ lấy");
  }

  createResponse(
    res,
    200,
    "Lấy danh sách đơn hàng chờ lấy thành công",
    orders
  );
});

// ✅ Lấy danh sách đơn hàng chờ xác nhận (seller)
export const getPendingOrders = handleAsync(async (req, res) => {
  const shopId = req.user?.id;
  const orders = await orderService.getPendingOrdersService(shopId);

  if (!orders || orders.length === 0) {
    return createResponse(res, 404, "Không có đơn hàng cần xác nhận");
  }

  createResponse(
    res,
    200,
    "Lấy danh sách đơn hàng cần xác nhận thành công",
    orders
  );
});

// ✅ Lấy danh sách đơn hàng đã giao
export const getDeliveredOrders = handleAsync(async (req, res) => {
  const userId = req.user?.id;
  const orders = await orderService.getDeliveredOrdersService(userId);

  if (!orders || orders.length === 0) {
    return createResponse(res, 404, "Không có đơn hàng đã giao");
  }

  createResponse(
    res,
    200,
    "Lấy danh sách đơn hàng đã giao thành công",
    orders
  );
});

// ✅ Xác nhận đơn hàng
export const confirmOrder = handleAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  const order = await orderService.confirmOrderService(id, userId);

  if (!order) return createResponse(res, 400, "Xác nhận đơn hàng thất bại");
  createResponse(res, 200, "Xác nhận đơn hàng thành công", order);
});

// 📦 Lấy danh sách đơn hàng của người mua
export const getMyOrders = handleAsync(async (req, res) => {
  const userId = req.user?.id;
  const orders = await orderService.getMyOrdersService(userId);

  if (!orders || orders.length === 0) {
    return createResponse(res, 404, "Bạn chưa có đơn hàng nào");
  }

  createResponse(
    res,
    200,
    "Lấy danh sách đơn hàng của bạn thành công",
    orders
  );
});
