import express from "express";
import {
  createOrder,
  getOrderByUserId,
  getAllOrders,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getMyOrders,
  getOrdersByShop,
  getWaitingPickupOrders,
  getDeliveredOrders,
  getPendingOrders,
  confirmOrder,
  updateOrderAddress,
} from "./orders.controller.js";

import { canUpdateStatus } from "../../common/middleware/checkOrderPermisstion.js";
import { authMiddleware, restrictTo } from "../../common/middleware/auth.js";
import { USER_ROLE } from "../../common/constant/enum.js";

const router = express.Router();

/* ===========================================
   🛒 ROUTES DÀNH CHO NGƯỜI MUA (BUYER)
=========================================== */

// 🧾 Tạo đơn hàng (Checkout.jsx)
router.post("/", authMiddleware, createOrder);

// 📦 Lấy danh sách đơn hàng của người mua
router.get("/my-orders", authMiddleware, getMyOrders);

// 🔍 Lấy chi tiết đơn hàng cụ thể
router.get("/:id", authMiddleware, getOrderByUserId);

// 🚚 Cập nhật địa chỉ giao hàng
router.put("/:id/address", authMiddleware, updateOrderAddress);

/* ===========================================
   🏪 ROUTES DÀNH CHO SELLER
=========================================== */
router.use(authMiddleware, restrictTo(USER_ROLE.SELLER, USER_ROLE.ADMIN));

// 📦 Lấy đơn hàng theo shop
router.get("/shop/:id", getOrdersByShop);

// 🕒 Đơn hàng chờ lấy hàng
router.get("/waiting-pickup", getWaitingPickupOrders);

// ⏳ Đơn hàng chờ xác nhận
router.get("/pending", getPendingOrders);

// ✅ Đơn hàng đã giao
router.get("/delivered", getDeliveredOrders);

// 🧾 Xác nhận đơn hàng
router.put("/:id/confirm", confirmOrder);

/* ===========================================
   ⚙️ ROUTES CHUNG (SELLER / ADMIN)
=========================================== */

// Lấy tất cả đơn hàng (toàn hệ thống)
router.get("/", authMiddleware, getAllOrders);

// Cập nhật đơn hàng
router.put("/:id", authMiddleware, updateOrder);

// Cập nhật trạng thái đơn hàng
router.put(
  "/:id/status",
  authMiddleware,
  canUpdateStatus,
  updateOrderStatus
);

// Xóa đơn hàng
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
