// middleware/checkOrderPermission.js
import Orders from "../orders/order.model.js";
import { ALLOWED_STATUS_FLOW, STATUS_ROLE_MAP } from "../orders/order.workflow.js";

export const canUpdateStatus = async (req, res, next) => {
    const { id } = req.params;
    const { newStatus } = req.body;
    const user = req.user; // từ auth middleware

    const order = await Orders.findById(id);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    const currentStatus = order.status;

    // Kiểm tra flow
    const allowedNextStatuses = ALLOWED_STATUS_FLOW[currentStatus] || [];
    if (!allowedNextStatuses.includes(newStatus)) {
        return res.status(400).json({
            message: `Không thể đổi từ ${currentStatus} -> ${newStatus}`,
        });
    }

    // Kiểm tra role
    const allowedRoles = STATUS_ROLE_MAP[newStatus]?.canChangeTo || [];
    if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
            message: `Role ${user.role} không được phép đổi sang trạng thái ${newStatus}`,
        });
    }

    // Cho phép đi tiếp
    next();
};
