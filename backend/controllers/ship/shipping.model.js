import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
        unique: true // mỗi shop chỉ có 1 config shipping
    },
    methods: [{
        name: {
            type: String,
            enum: ["express", "fast", "pickup", "bulky"], // danh sách phương thức
            required: true
        },
        isActive: { type: Boolean, default: false },     // shop có bật phương thức này không
        codEnabled: { type: Boolean, default: false },   // có cho COD không
        weightLimit: { type: Number }                    // chỉ áp dụng nếu là pickup
    }],
    createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

export default mongoose.model("Shipping", shippingSchema);
