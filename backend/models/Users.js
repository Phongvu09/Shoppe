import mongoose from "mongoose"
import { USER_ROLE } from "../common/constant/enum.js";

const userSchema = new mongoose.Schema({
    UserId: { type: String, unique: true }, // mã user tự sinh kiểu U001
    username: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: [true, "Email là bắt buộc"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
    },
    password: { type: String, required: true },

    // thêm role
    role: {
        type: [String],
        enum: Object.values(USER_ROLE),
        default: [USER_ROLE.USER]   // Mặc định là USER,
    },

    createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

// Tự sinh UserId (U001, U002,...)
userSchema.pre("validate", async function (next) {
    if (!this.UserId) {
        const count = await this.constructor.countDocuments();
        this.UserId = "U" + (count + 1).toString().padStart(3, "0");
    }
    next()
})

export default mongoose.model("User", userSchema);