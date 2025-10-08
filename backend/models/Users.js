import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto"; // ✅ Thêm dòng này để tạo mã random

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true, index: true }, // ✅ vẫn giữ lại
    username: {
      type: String,
      required: [true, "Tên người dùng là bắt buộc"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    phone: { type: String, default: "" },
    address: { type: String, default: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh" },
    email: {
      type: String,
      required: [true, "Email là bắt buộc"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: [String],
      enum: ["user", "seller", "admin"],
      default: ["user"],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

// ✅ Cập nhật cách tạo userId an toàn (không bị trùng)
userSchema.pre("save", function (next) {
  if (!this.userId) {
    const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase(); // ví dụ: A3F7D9
    this.userId = `USR-${randomPart}`;
  }
  next();
});

// 🔐 Hash password trước khi save
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// 🔐 So sánh mật khẩu khi login
userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

export default mongoose.model("User", userSchema);
