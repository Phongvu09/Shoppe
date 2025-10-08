import express from "express";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getMyOrders,
  updateOrderAddress, // ✅ thêm
} from "./orders.controller.js";

// ⚠️ Đổi tên middleware đúng theo file auth.js thật của anh
import { requireAuth as authMiddleware } from "../../common/middleware/auth.js";

import { canUpdateStatus } from "./order.middleware.js";

const router = express.Router();

/* ========================
   ✅ Các route FE Shopee Lite
======================== */

// Đặt hàng (Checkout.jsx)
router.post("/", authMiddleware, createOrder);

// Lấy danh sách đơn hàng người dùng
router.get("/my-orders", authMiddleware, getMyOrders);

// Xem chi tiết đơn hàng
router.get("/:id", authMiddleware, getOrderById);

// ✅ Cập nhật địa chỉ đơn hàng
router.put("/:id/address", authMiddleware, updateOrderAddress);

/* ========================
   ⚙️ Các route hệ thống khác
======================== */
router.get("/", authMiddleware, getAllOrders);
router.put("/:id", authMiddleware, updateOrder);
router.put("/:id/status", authMiddleware, canUpdateStatus, updateOrderStatus);
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
