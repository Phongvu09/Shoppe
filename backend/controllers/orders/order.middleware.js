// middleware/order.middleware.js

// ✅ Import đúng model (đã chỉnh chính xác theo file orders.model.js)
import Orders from "./orders.model.js";

// ✅ Import các quy tắc luồng trạng thái (nếu có)
import { ALLOWED_STATUS_FLOW, STATUS_ROLE_MAP } from "../orders/order.workflow.js";

/**
 * Middleware kiểm tra xem trạng thái đơn hàng có thể cập nhật được hay không
 * Dùng trong route PUT /:id/status
 */
export const canUpdateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;
    const user = req.user; // từ authMiddleware

    // ✅ Tìm đơn hàng theo ID
    const order = await Orders.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    const currentStatus = order.status;

    // ✅ Kiểm tra flow hợp lệ
    const allowedNextStatuses = ALLOWED_STATUS_FLOW[currentStatus] || [];
    if (!allowedNextStatuses.includes(newStatus)) {
      return res.status(400).json({
        message: `Không thể đổi trạng thái từ '${currentStatus}' → '${newStatus}'`,
      });
    }

    // ✅ Nếu hợp lệ → tiếp tục
    next();
  } catch (err) {
    console.error("❌ Lỗi kiểm tra trạng thái đơn hàng:", err);
    res.status(500).json({ message: "Lỗi server khi cập nhật trạng thái đơn hàng" });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    return res.status(200).json({
      message: `Xóa đơn hàng ${id} (demo)`,
    });
  } catch (err) {
    console.error("❌ Lỗi deleteOrder:", err);
    res.status(500).json({ message: "Lỗi khi xóa đơn hàng" });
  }
};