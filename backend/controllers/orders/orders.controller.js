import * as orderService from "./order.service.js";
import { createResponse } from "../../common/configs/respone.config.js";
import { handleAsync } from "../../common/utils/handle-asynce.config.js";

/* ===========================================
   🔹 Các hàm FE Shopee Lite cần dùng
=========================================== */

// ✅ Tạo đơn hàng (Checkout.jsx)
export const createOrder = handleAsync(async (req, res) => {
  const { products, totalPrice, paymentMethod, address } = req.body;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return createResponse(res, 400, "Danh sách sản phẩm không hợp lệ");
  }

  const order = await orderService.createOrderService({
    userId: req.user._id,
    shopId: products[0]?.shopId || "unknown",
    products,
    totalPrice,
    paymentMethod: paymentMethod || "COD",
    address: address || "123 Đường ABC, Quận 1, TP.HCM",
  });

  if (!order) return createResponse(res, 400, "Tạo đơn hàng thất bại");
  return createResponse(res, 201, "Đặt hàng thành công 🎉", order);
});

// ✅ Lấy danh sách đơn hàng người dùng
export const getMyOrders = handleAsync(async (req, res) => {
  const orders = await orderService.getMyOrdersService(req.user._id);
  if (!orders || orders.length === 0)
    return createResponse(res, 404, "Không có đơn hàng nào");
  return createResponse(res, 200, "Lấy danh sách đơn hàng thành công", orders);
});

// ✅ Lấy chi tiết 1 đơn hàng
export const getOrderById = handleAsync(async (req, res) => {
  const order = await orderService.getOrderByIdService(req.params.id, req.user._id);
  if (!order) return createResponse(res, 404, "Không tìm thấy đơn hàng");
  return createResponse(res, 200, "Lấy chi tiết đơn hàng thành công", order);
});

// ✅ Cập nhật địa chỉ giao hàng
export const updateOrderAddress = handleAsync(async (req, res) => {
  const { id } = req.params;
  const { address } = req.body;
  if (!address || address.trim() === "")
    return createResponse(res, 400, "Địa chỉ không hợp lệ");

  const order = await orderService.updateOrderService(id, req.user._id, { address });
  if (!order) return createResponse(res, 404, "Không tìm thấy đơn hàng");
  return createResponse(res, 200, "Cập nhật địa chỉ thành công ✅", order);
});

/* ===========================================
   🔹 Các hàm Admin / Seller (Stub)
=========================================== */

export const getAllOrders = handleAsync(async (req, res) => {
  const orders = await orderService.getAllOrdersService?.();
  return createResponse(res, 200, "Lấy danh sách tất cả đơn hàng (demo)", orders || []);
});

export const updateOrder = handleAsync(async (req, res) => {
  return createResponse(res, 200, "Cập nhật đơn hàng thành công (demo)");
});

export const updateOrderStatus = handleAsync(async (req, res) => {
  return createResponse(res, 200, "Cập nhật trạng thái đơn hàng (demo)");
});

export const deleteOrder = handleAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const order = await orderService.deleteOrderService(id, userId);
  if (!order) return createResponse(res, 404, "Không tìm thấy đơn hàng để xóa");

  return createResponse(res, 200, "Xóa đơn hàng thành công ✅", order);
});
