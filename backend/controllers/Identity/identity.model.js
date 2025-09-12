import mongoose from "mongoose";

const identitySchema = new mongoose.Schema(
    {
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop",
            required: true,
            unique: true,
        },

        // 1. Họ tên theo giấy tờ
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        // 2. Ngày sinh
        dateOfBirth: {
            type: Date,
            required: true,
        },

        // 3. Thông tin giấy tờ tùy thân
        idType: {
            type: String,
            enum: ["CCCD", "CMND", "Passport"],
            required: true,
        },
        idNumber: {
            type: String,
            required: true,
            trim: true,
        },
        issuedDate: {
            type: Date,
            required: true,
        },
        issuedPlace: {
            type: String,
            required: true,
            trim: true,
        },

        // 4. Ảnh giấy tờ
        frontImage: { type: String, required: true }, // link Cloudinary
        backImage: { type: String, required: true },

        // 5. Ảnh selfie (so khớp khuôn mặt)
        selfieImage: { type: String, required: true },

        // 6. Địa chỉ thường trú
        address: {
            country: { type: String, default: "Việt Nam" },
            province: { type: String, required: true },
            district: { type: String, required: true },
            ward: { type: String, required: true },
            street: { type: String, required: true },
        },

        // 7. Email & số điện thoại xác thực
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },

        createdAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

export default mongoose.model("Identity", identitySchema);
