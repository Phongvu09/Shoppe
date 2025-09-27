import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderId: { type: String, unique: true },
        buyerId: { type: String, required: true },
        sellerId: { type: String, required: true },
        products: [
            {
                productId: String,
                name: String,
                price: Number,
                quantity: Number,
                sizes: [String],
                colors: [String],
                images: [{ url: String, public_id: String }],
            },
        ],
        totalPrice: { type: Number, required: true },

        // chỉ dùng 1 field status
        status: {
            type: String,
            enum: [
                "pending",          // chờ xác nhận
                "waiting_pickup",   // chờ lấy hàng
                "processed",        // đã xử lý
                "canceled",         // đơn hủy
                "returned",         // trả hàng/hoàn tiền
                "delivered"         // đã giao xong (hoàn tất)
            ],
            default: "pending",
        },
        isLockedByAdmin: { type: Boolean, default: false },

    },
    { timestamps: true }
);

// Tạo orderId tự sinh
orderSchema.pre("validate", async function (next) {
    if (!this.orderId) {
        const count = await this.constructor.countDocuments();
        this.orderId = "O" + (count + 1).toString().padStart(5, "0");
    }
    next();
});

const Orders = mongoose.model("Order", orderSchema);
export default Orders;
