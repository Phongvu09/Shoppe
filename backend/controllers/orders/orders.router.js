import express from "express";
import * as orderController from "./order.controller.js";
import { auth } from "../../middlewares/auth.js";
import { canUpdateStatus } from "../../middlewares/checkOrderPermission.js";
import { authMiddleware, restrictTo } from "../../common/middleware/auth.js";
import { USER_ROLE } from "../../common/constant/enum.js";
import { createOrderSchema } from "./order.schema.js";
import { validBodyRequest } from "../../common/middleware/valid-body.middleware.js";

const router = express.Router();

// 📌 Lấy chi tiết đơn hàng theo id
router.get("/:id", orderController.getOrderById);

// 📌 Cập nhật đơn hàng (ví dụ địa chỉ, thông tin khác)
router.patch("/:id", auth, orderController.updateOrder);

// 📌 Cập nhật trạng thái đơn hàng (buyer/seller/admin theo workflow)
router.patch("/:id/status", auth, canUpdateStatus, orderController.updateOrderStatus);

// 📌 Tạo đơn hàng (buyer)
router.post("/", authMiddleware, restrictTo(USER_ROLE.SELLER), validBodyRequest(createOrderSchema), orderController.createOrder);

router.use(authMiddleware, restrictTo(USER_ROLE.ADMIN, USER_ROLE.SELLER))
// 📌 Lấy tất cả đơn hàng (admin, hoặc seller lấy của mình)
router.get("/", orderController.getAllOrders);

// 📌 Xóa đơn hàng
router.delete("/:id", auth, orderController.deleteOrder);


export default router;
