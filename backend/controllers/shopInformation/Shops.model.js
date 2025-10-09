import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        shopName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        phoneNumber: { type: String, required: true, unique: true },

        pickupAddress: {
            receiverName: { type: String, required: true },
            phone: { type: String, required: true },
            street: { type: String, required: true },
            ward: { type: String, required: true },
            district: { type: String, required: true },
            city: { type: String, required: true },
            commune: { type: String },
        },

        createdAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

export default mongoose.model("Shop", shopSchema);
