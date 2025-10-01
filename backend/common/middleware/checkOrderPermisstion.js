import Orders from "../../controllers/orders/orders.model.js";
import { ALLOWED_STATUS_FLOW, STATUS_ROLE_MAP } from "../../controllers/orders/order.workflow.js";

export const canUpdateStatus = async (req, res, next) => {
    const { id } = req.params;
    const { newStatus } = req.body;
    const user = req.user;

    const order = await Orders.findById(id);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    const currentStatus = order.status;

    // 1. Check flow
    const allowedNextStatuses = ALLOWED_STATUS_FLOW[currentStatus] || [];
    if (!allowedNextStatuses.includes(newStatus)) {
        return res.status(400).json({
            message: `Không thể đổi từ ${currentStatus} -> ${newStatus}`,
        });
    }

    // 2. Check role theo trạng thái hiện tại
    const allowedRoles = STATUS_ROLE_MAP[currentStatus] || [];
    const userRole = Array.isArray(user.role) ? user.role : [user.role];

    const ok = userRole.some((r) => allowedRoles.includes(r));
    if (!ok) {
        return res.status(403).json({
            message: `Role ${userRole.join(", ")} không được phép đổi từ trạng thái ${currentStatus} -> ${newStatus}`,
        });
    }

    next();
};
