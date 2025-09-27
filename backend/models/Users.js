import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { USER_ROLE } from "../common/constant/enum.js";

const userSchema = new mongoose.Schema(
  {
    UserId: { type: String, unique: true, index: true },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email là bắt buộc"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
      index: true,
    },
    password: { type: String, required: true, minlength: 6, select: false },

    role: {
      type: [String],
      enum: Object.values(USER_ROLE),
      default: [USER_ROLE.USER],
    },

    // ✅ trạng thái role
    roleStatus: {
      USER: { type: Boolean, default: true },
      SELLER: { type: Boolean, default: true },
      ADMIN: { type: Boolean, default: true },
    },

    refreshToken: { type: String, default: null },
    passwordResetToken: { type: String, default: null, select: false },
    passwordResetExpires: { type: Date, default: null, select: false },
  },
  { timestamps: true, versionKey: false }
);

// TODO: production nên thay bằng counter collection/uuid để tránh race condition
userSchema.pre("validate", async function (next) {
  if (!this.UserId) {
    const count = await this.constructor.countDocuments();
    this.UserId = "U" + (count + 1).toString().padStart(3, "0");
  }
  next();
});

// Hash password nếu được sửa/đặt mới
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// So sánh mật khẩu
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

export default mongoose.model("User", userSchema);
