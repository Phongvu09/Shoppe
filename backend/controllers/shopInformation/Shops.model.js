import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
    {
        shopId: {
            type: String,
            required: true,
            unique: true // mỗi user chỉ có 1 shop
        },
        shopName: { type: String, required: true, trim: true },

        pickupAddress: {
            receiverName: { type: String, required: true, trim: true },
            phone: { type: String, required: true },
            street: { type: String, required: true }, // số nhà, tên đường
            ward: { type: String, required: true },
            district: { type: String, required: true },
            city: { type: String, required: true }
        },

        email: { type: String, required: true, unique: true, lowercase: true },
        phoneNumber: { type: String, required: true, unique: true },

        createdAt: { type: Date, default: Date.now }
    },
    { versionKey: false }
);


shopSchema.pre("validate", async function (next) {
    if (!this.shopId) {
        const count = await this.constructor.countDocuments();
        this.shopId = "SH" + (count + 1).toString().padStart(3, "0");
    }
    next();
});

export default mongoose.model("Shop", shopSchema);
