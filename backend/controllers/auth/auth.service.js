import bcrypt from "bcryptjs";
import User from "../../models/Users.js";
import { signAccessToken } from "../../common/utils/jwt.js";

// ✅ Đăng ký user hoặc seller
export const registerService = async ({ username, email, password, role }) => {
  const existed = await User.findOne({ email });
  if (existed) return null;

  // 🔐 Hash mật khẩu chắc chắn 1 lần
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role: role?.map((r) => r.toLowerCase()) || ["user"],
  });

  newUser.password = undefined;
  return newUser;
};

// ✅ Đăng nhập
export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) return { user: null, accessToken: null };

  // So sánh mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("🔍 Login debug:", {
    enteredPassword: password,
    hashedPassword: user.password,
    isMatch,
  });

  if (!isMatch) return { user: null, accessToken: null };

  const accessToken = signAccessToken({
    id: user._id.toString(),
    role: user.role,
  });

  user.password = undefined;
  return { user, accessToken };
};
