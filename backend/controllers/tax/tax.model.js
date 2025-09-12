import mongoose from "mongoose";

const tax = new mongoose.Schema({
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    businessType: {
        type: String,
        enum: ["Individual", "Housldhold Bussiness", "Company"],
        required: true
    },
    CompanyName: { type: String },
    BusinessRegistrationAddress: {
        country: { type: String, default: "Việt Nam" },
        "Province(City)": { type: String, required: true },
        District: { type: String, required: true },
        Ward: { type: String, required: true },
        Commune: { type: String }
    },
    taxCode: { type: String, required: true },
    EmailforReceiving_eInvoices: {
        type: String, required: true
    }


})
export default mongoose.model("Tax", tax);