import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Mã đơn hàng tự sinh (O00001)
    orderId: { type: String, unique: true },

    // ID người dùng (lấy từ token)
    userId: { type: String, required: true },

    // ID cửa hàng (nếu có, hiện FE chưa dùng)
    shopId: { type: String, default: "default_shop" },

    // Danh sách sản phẩm trong đơn
    products: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        sizes: [String],
        colors: [String],
        images: [{ url: String, public_id: String }],
      },
    ],

    // Tổng giá trị đơn hàng
    totalPrice: { type: Number, required: true },

    // Địa chỉ giao hàng
    address: {
      type: String,
      default: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
    },

    // Phương thức thanh toán
    paymentMethod: { type: String, default: "COD" },

    // Trạng thái đơn hàng
    status: {
      type: String,
      enum: [
        "pending",          // chờ xác nhận
        "waiting_pickup",   // chờ lấy hàng
        "processed",        // đã xử lý
        "canceled",         // đã hủy
        "returned",         // trả hàng / hoàn tiền
        "delivered",        // đã giao thành công
      ],
      default: "pending",
    },

    // Khoá admin (nếu cần)
    isLockedByAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ✅ Tự động tạo orderId nếu chưa có
orderSchema.pre("validate", async function (next) {
  if (!this.orderId) {
    const count = await this.constructor.countDocuments();
    this.orderId = "O" + (count + 1).toString().padStart(5, "0");
  }
  next();
});

const Orders = mongoose.model("Order", orderSchema);
export default Orders;
