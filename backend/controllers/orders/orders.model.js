import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true },
    userId: { type: String, ref: "User" },
    shopId: { type: String, ref: "User", required: true },

    products: [
      {
        productId: { type: String, ref: "Product" },
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

    // ✅ Thêm field để tương thích với các bản FE cũ (tùy chọn)
    address: {
      type: String,
      default: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
    },
    paymentMethod: { type: String, default: "COD" },

    status: {
      type: String,
      enum: [
        "pending", // chờ xác nhận
        "waiting_pickup", // chờ lấy hàng
        "processed", // đã xử lý
        "canceled", // đã hủy
        "returned", // trả hàng
        "delivered", // đã giao
      ],
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

// ✅ Sinh orderId tự động & tính totalAmount
orderSchema.pre("validate", async function (next) {
  if (!this.orderId) {
    const count = await this.constructor.countDocuments();
    this.orderId = "O" + (count + 1).toString().padStart(6, "0");
  }
  next();
});

orderSchema.pre("save", function (next) {
  this.totalAmount =
    this.totalPrice + (this.shippingFee || 0) - (this.discount || 0);
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
