import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderId: { type: String, unique: true },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        sizes: {
            type: [String],
            default: [], // Ví dụ: ["S", "M", "L", "XL"]
        },
        colors: {
            type: [String],
            default: [], // Ví dụ: ["red", "blue", "black"]
        },
        images: [
            {
                _id: false,
                url: { type: String, required: true },       // URL ảnh từ Cloudinary
                public_id: { type: String, required: true }, // ID dùng để quản lý ảnh trên Cloudinary
            }
        ],
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true, // tự động tạo createdAt và updatedAt
    }
);

orderSchemaSchema.pre("validate", async function (next) {
    if (!this.orderId) {
        const count = await this.constructor.countDocuments();
        this.orderId = "P" + (count + 1).toString().padStart(3, "0");
    }
    next();
});


const Orders = mongoose.model("Order", orderSchema);

export default Orders;
