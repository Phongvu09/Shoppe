import bcrypt from "bcryptjs";
import User from "../../models/Users.js";
import { signAccessToken } from "../../common/utils/jwt.js";

// ✅ Đăng ký user hoặc seller
export const registerService = async ({ username, email, password, role }) => {
  // Kiểm tra email tồn tại chưa
  const existed = await User.findOne({ email });
  if (existed) return null;

  // 🚫 KHÔNG hash mật khẩu ở đây nữa, vì User model đã tự hash trong pre("save")
  const newUser = await User.create({
    username,
    email,
    password, // để raw password, schema sẽ tự hash
    role: role?.map((r) => r.toLowerCase()) || ["user"],
  });

  newUser.password = undefined; // không trả mật khẩu ra response
  return newUser;
};

// ✅ Đăng nhập
export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) return { user: null, accessToken: null };

  // 🔐 So sánh mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("🔍 Login debug:", {
    enteredPassword: password,
    hashedPassword: user.password,
    isMatch,
  });

  if (!isMatch) return { user: null, accessToken: null };

  // ✅ Tạo access token
  const accessToken = signAccessToken({
    id: user._id.toString(),
    role: user.role,
  });

  user.password = undefined;
  return { user, accessToken };
};
