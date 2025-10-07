import express from "express";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getMyOrders, // 🔥 FE Shopee Lite cần
} from "./orders.controller.js";

import { authMiddleware } from "../../common/middleware/auth.js";

// ✅ Giữ nguyên validate nếu project có file, nếu không thì tạm comment lại
// import { validBodyRequest } from "../../common/middleware/validate-body.middleware.js";

import {
  createOrderSchema,
  updateOrderSchema,
  updateStatusSchema,
} from "./order.schema.js";

import { canUpdateStatus } from "./order.middleware.js";

const router = express.Router();

/* ========================
   ✅ Các route FE Shopee Lite cần
======================== */

// Đặt hàng (Checkout.jsx)
router.post("/", authMiddleware, createOrder);

// Lấy danh sách đơn hàng người dùng
router.get("/my-orders", authMiddleware, getMyOrders);

// Xem chi tiết đơn hàng
router.get("/:id", authMiddleware, getOrderById);

/* ========================
   ⚙️ Các route hệ thống bạn anh đã có (Admin/Seller)
======================== */

// Lấy tất cả đơn hàng (Admin)
router.get("/", authMiddleware, getAllOrders);

// Cập nhật đơn hàng (Seller/Admin)
router.put(
  "/:id",
  authMiddleware,
  // validBodyRequest(updateOrderSchema), // ❌ Tạm tắt nếu middleware chưa có
  updateOrder
);

// Cập nhật trạng thái đơn hàng (Seller/Admin)
router.put(
  "/:id/status",
  authMiddleware,
  // validBodyRequest(updateStatusSchema), // ❌ Tạm tắt nếu middleware chưa có
  canUpdateStatus,
  updateOrderStatus
);

// Xóa đơn hàng (Admin)
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
