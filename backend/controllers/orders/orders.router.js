import express from "express";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getMyOrders,
  getOrderByshopId,
  getWaitingPickupOrders,
  getDeliveredOrders,
  getPendingOrders,
} from "./orders.controller.js";

import { canUpdateStatus } from "../../common/middleware/checkOrderPermisstion.js";
import { authMiddleware, restrictTo } from "../../common/middleware/auth.js";
import { USER_ROLE } from "../../common/constant/enum.js";
import { createOrderSchema } from "./order.schema.js";
// import { validBodyRequest } from "../../common/middleware/valid-body.middleware.js";

const router = express.Router();

/* ========================
   🛒 Route cho FE Shopee Lite
======================== */

// Đặt hàng (Checkout.jsx)
router.post("/", authMiddleware, createOrder);

// Lấy danh sách đơn hàng người dùng
router.get("/my-orders", authMiddleware, getMyOrders);

// Xem chi tiết đơn hàng
router.get("/:id", authMiddleware, getOrderById);

/* ========================
   ⚙️ Route cho Admin / Seller
======================== */

// Lấy tất cả đơn hàng
router.get("/", authMiddleware, getAllOrders);

// Cập nhật đơn hàng
router.put(
  "/:id",
  authMiddleware,
  // validBodyRequest(updateOrderSchema),
  updateOrder
);

// Cập nhật trạng thái đơn hàng
router.put(
  "/:id/status",
  authMiddleware,
  // validBodyRequest(updateStatusSchema),
  canUpdateStatus,
  updateOrderStatus
);

// Xóa đơn hàng
router.delete("/:id", authMiddleware, deleteOrder);

/* ========================
   📦 Route cho Seller (quản lý theo shop)
======================== */
router.use(authMiddleware, restrictTo(USER_ROLE.ADMIN, USER_ROLE.SELLER));

router.get("/waitingPickupOrders", getWaitingPickupOrders);
router.get("/deliveredOrders", getDeliveredOrders);
router.get("/pendingOrders", getPendingOrders);
router.get("/shop/:id", getOrderByshopId);

export default router;
