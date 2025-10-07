import express from "express";
import { createOrder, getOrderByshopId, getAllOrders, updateOrder, updateOrderStatus, deleteOrder, getWaitingPickupOrders, getDeliveredOrders, getPendingOrders, getMyOrders } from "./orders.controller.js";
import { canUpdateStatus } from "../../common/middleware/checkOrderPermisstion.js";
import { authMiddleware, restrictTo } from "../../common/middleware/auth.js";
import { USER_ROLE } from "../../common/constant/enum.js";
import { createOrderSchema } from "./order.schema.js";
import { validBodyRequest } from "../../common/middleware/valid-body.middleware.js";

const router = express.Router();

// 📌 Lấy chi tiết đơn hàng theo id
router.get("/", getAllOrders);
// 📦 Buyer xem danh sách đơn hàng của mình
router.get("/my-orders", authMiddleware, restrictTo(USER_ROLE.USER), getMyOrders);

// 📌 Cập nhật đơn hàng (ví dụ địa chỉ, thông tin khác)
router.patch("/:id", authMiddleware, updateOrder);

// 📌 Cập nhật trạng thái đơn hàng (buyer/seller/admin theo workflow)
router.patch(
    "/:id/status",
    authMiddleware,
    canUpdateStatus,
    updateOrderStatus
);

// 📌 Tạo đơn hàng (buyer)
router.post("/", authMiddleware, restrictTo(USER_ROLE.USER), validBodyRequest(createOrderSchema), createOrder);

// delete order
router.delete("/:id", authMiddleware, deleteOrder);

router.use(authMiddleware, restrictTo(USER_ROLE.ADMIN, USER_ROLE.SELLER));
router.get("/waitingPickupOrders/", getWaitingPickupOrders);
router.get("/deliveredOrders/", getDeliveredOrders);
router.get("/pendingOrders/", getPendingOrders);
router.get("/shop/:id", getOrderByshopId);


const orderRouter = router
export default orderRouter;
