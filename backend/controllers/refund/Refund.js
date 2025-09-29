import mongoose from "mongoose";

const refundSchema = new mongoose.Schema(
    {
        refundId: { type: String, unique: true, index: true },
        orderId: { type: String, required: true },
        userId: { type: String, required: true },   // người mua
        shopId: { type: String, required: true }, // người bán

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

        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED", "REFUNDED"],
            default: "PENDING",
        },
    },
    { timestamps: true, versionKey: false }
);

const Refunds = mongoose.model("Refund", refundSchema);
export default Refunds;
