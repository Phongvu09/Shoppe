import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true, index: true },
    username: {
      type: String,
      required: [true, "Tên người dùng là bắt buộc"],
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

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    // ✅ Enum đơn giản, tránh lỗi hoa/thường
    role: {
      type: [String],
      enum: ["user", "seller", "admin"],
      default: ["user"],
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

// 🧠 Auto tạo mã userId
userSchema.pre("save", function (next) {
  if (!this.userId) {
    this.userId = `USR-${Date.now().toString().slice(-6)}`;
  }
  next();
});

// 🔐 Hash password trước khi save (chỉ hash nếu password thay đổi)
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
