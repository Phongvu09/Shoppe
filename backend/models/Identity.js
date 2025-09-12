import mongoose from "mongoose";

const identitySchema = new mongoose.Schema({
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
        unique: true
    },

    ownerType: {
        type: String,
        enum: ["individual", "business"],
        required: true
    },

    // Nếu là cá nhân
    personalInfo: {
        fullName: { type: String },
        idType: { type: String, enum: ["CCCD", "CMND", "Passport"] },
        idNumber: { type: String },
        issuedDate: { type: Date },
        issuedPlace: { type: String },
        frontImage: { type: String },  // link Cloudinary
        backImage: { type: String }
    },

    // Nếu là doanh nghiệp
    businessInfo: {
        companyName: { type: String },
        businessLicenseNumber: { type: String },
        issuedDate: { type: Date },
        issuedPlace: { type: String },
        licenseImage: { type: String } // link Cloudinary
    },

    createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

export default mongoose.model("Identity", identitySchema);
