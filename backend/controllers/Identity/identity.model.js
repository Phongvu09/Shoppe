import mongoose from "mongoose";

const identitySchema = new mongoose.Schema(
    {
        shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },

        idType: { type: String, enum: ["CCCD", "CMND", "Passport"], required: true },

        fullName: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },

        idNumber: { type: String, required: true },
        issuedDate: { type: Date, required: true },
        issuedPlace: { type: String, required: true },

        frontImage: { type: String, required: true },
        backImage: { type: String, required: true },
        selfieImage: { type: String, required: true },

        address: {
            country: { type: String, default: "Việt Nam" },
            province: { type: String, required: true },
            district: { type: String, required: true },
            ward: { type: String, required: true },
            street: { type: String, required: true },
        },

        email: { type: String, required: true, lowercase: true, trim: true },
        phoneNumber: { type: String, required: true, trim: true },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Identity", identitySchema);
