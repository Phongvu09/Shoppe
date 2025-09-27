import mongoose from "mongoose";

const refundSchema = new mongoose.Schema(
    {
        orderId: { type: String, required: true },
        userId: { type: String, required: true },
        sellerId: { type: String, required: true },

        reason: {
            type: String,
            enum: [
                "PRODUCT_DEFECTIVE",
                "PRODUCT_NOT_AS_DESCRIBED",
                "WRONG_PRODUCT_DELIVERED",
                "MISSING_ITEMS",
                "FAKE_OR_POOR_QUALITY",
                "DAMAGED_IN_TRANSIT",
                "LATE_DELIVERY",
                "SELLER_CANCELLED",
                "NOT_RECEIVED",
                "PAYMENT_ERROR",
            ],
            required: true,
        },

        // Trạng thái dưới dạng flag 
        isPending: { type: Boolean, default: true },   // chờ xử lý
        isApproved: { type: Boolean, default: false }, // chấp nhận
        isRejected: { type: Boolean, default: false }, // từ chối
        isRefunded: { type: Boolean, default: false }, // đã hoàn tiền
    },
    { timestamps: true } // tự động createdAt & updatedAt
);

const Refunds = mongoose.model("Refund", refundSchema);
export default Refunds;
