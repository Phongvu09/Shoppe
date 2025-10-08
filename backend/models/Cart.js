// models/Cart.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: { type: Number, required: true }, // id sản phẩm FE gửi
      name: String,
      price: Number,
      img: String,
      quantity: { type: Number, default: 1 },
    },
  ],
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
