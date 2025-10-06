import express from "express";
<<<<<<< HEAD
import * as orderController from "./order.controller.js";
import { auth } from "../../common/middleware";
import { canUpdateStatus } from "../../middleware/checkOrderPermission.js";
=======
import { createOrder, getOrderById, getAllOrders, updateOrder, updateOrderStatus, deleteOrder } from "./orders.controller.js";
import { canUpdateStatus } from "../../common/middleware/checkOrderPermisstion.js";
>>>>>>> a380cd80723a24bd5d7207b7c85ca5cd9f7677c3
import { authMiddleware, restrictTo } from "../../common/middleware/auth.js";
import { USER_ROLE } from "../../common/constant/enum.js";
import { createOrderSchema } from "./order.schema.js";
import { validBodyRequest } from "../../common/middleware/valid-body.middleware.js";

const router = express.Router();

// 📌 Lấy chi tiết đơn hàng theo id
router.get("/:id", getOrderById);

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

// các route admin/seller
router.use(authMiddleware, restrictTo(USER_ROLE.ADMIN, USER_ROLE.SELLER));
router.get("/", getAllOrders);

const orderRouter = router
export default orderRouter;
