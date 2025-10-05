import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderId: { type: String, unique: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        shopId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                name: String,
                price: Number,
                quantity: Number,
                sizes: [String],
                colors: [String],
                images: [{ url: String, public_id: String }],
            },
        ],

        totalPrice: { type: Number, required: true }, // tổng giá trị sản phẩm
        shippingMethod: {
            type: String,
            enum: ["express", "fast", "pickup", "bulky"],
            required: true,
        },
        shippingFee: { type: Number, required: true, default: 0 },
        discount: { type: Number, default: 0 },
        totalAmount: { type: Number, required: true },

        status: {
            type: String,
            enum: ["pending", "waiting_pickup", "processed", "canceled", "returned", "delivered"],
            default: "pending",
        },

        confirmedAt: Date,
        shippedAt: Date,
        deliveredAt: Date,
        canceledAt: Date,

        isLockedByAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Sinh orderId tự động & tính totalAmount
orderSchema.pre("validate", async function (next) {
    if (!this.orderId) {
        const count = await this.constructor.countDocuments();
        this.orderId = "O" + (count + 1).toString().padStart(6, "0");
    }
    next();
});

orderSchema.pre("save", function (next) {
    this.totalAmount = this.totalPrice + (this.shippingFee || 0) - (this.discount || 0);
    next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
