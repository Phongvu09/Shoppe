import mongoose from "mongoose";
const taxSchema = new mongoose.Schema({
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    businessType: { type: String, enum: ["Individual", "HouseholdBusiness", "Company"], required: true },

    // Cá nhân
    fullName: {
        type: String,
        required: function () { return this.businessType === "Individual"; }
    },
    personalAddress: {
        type: String,
        required: function () { return this.businessType === "Individual"; }
    },

    // Hộ kinh doanh / Công ty
    companyName: {
        type: String,
        required: function () { return this.businessType !== "Individual"; }
    },
    businessRegistrationAddress: {
        country: { type: String, default: "Việt Nam" },
        province: {
            type: String,
            required: function () { return this.businessType !== "Individual"; }
        },
        district: {
            type: String,
            required: function () { return this.businessType !== "Individual"; }
        },
        ward: {
            type: String,
            required: function () { return this.businessType !== "Individual"; }
        },
        commune: { type: String }
    },
    businessLicense: {
        type: String,
        required: function () { return this.businessType !== "Individual"; }
    },

    // Chung
    taxCode: { type: String, required: true },
    emailForReceivingEInvoices: { type: String, required: true }
});

export default mongoose.model("Tax", taxSchema);
