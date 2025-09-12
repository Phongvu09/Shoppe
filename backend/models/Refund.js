import mongoose from "mongoose";

const refundSchema = new mongoose.Schema({
    orderId: { type: String, required: true },   // Mã đơn hàng
    userId: { type: String, required: true },    // Người yêu cầu hoàn tiền

    reason: {
        type: String,
        enum: [
            "PRODUCT_DEFECTIVE",        // 1. Sản phẩm bị lỗi / hỏng / không hoạt động
            "PRODUCT_NOT_AS_DESCRIBED", // 2. Sản phẩm không đúng mô tả
            "WRONG_PRODUCT_DELIVERED",  // 3. Giao sai sản phẩm
            "MISSING_ITEMS",            // 4. Thiếu sản phẩm / phụ kiện
            "FAKE_OR_POOR_QUALITY",     // 5. Hàng giả, hàng nhái
            "DAMAGED_IN_TRANSIT",       // 6. Hư hỏng do vận chuyển
            "LATE_DELIVERY",            // 7. Đơn giao chậm
            "SELLER_CANCELLED",         // 8. Người bán hủy / hết hàng
            "NOT_RECEIVED",             // 9. Đã trừ tiền nhưng không nhận được hàng
            "PAYMENT_ERROR",            // 10. Thanh toán lỗi / nhiều lần
        ],
        required: true,
    },

    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED", "REFUNDED"],
        default: "PENDING",
    },

    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Refund", refundSchema);
