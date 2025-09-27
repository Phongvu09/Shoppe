import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../../models/Users.js";
import { USER_ROLE } from "../../common/constant/enum.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../common/utils/jwt.js";
import { createResetToken } from "../../common/utils/reset-token.js";

/* Helpers */
const normalizeEmail = (email = "") => String(email).toLowerCase().trim();
const pickSafeUser = (u) => ({
  id: u._id,
  UserId: u.UserId,
  username: u.username,
  email: u.email,
  role: u.role,
  createdAt: u.createdAt,
});

/* -------------------- checkHaveUserRole -------------------- */
export const checkHaveSellerRole = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    const hasSellerRole =
      user &&
      user.roles.includes(USER_ROLE.SELLER) &&
      user.roleStatus?.SELLER === true;

    return res.json({ hasSellerRole });
  } catch (err) {
    next(err);
  }
};


/* -------------------- Auth -------------------- */

// POST /api/user/register
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body || {};
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    const normEmail = normalizeEmail(email);
    const existed = await User.findOne({ email: normEmail });
    if (existed) return res.status(409).json({ message: "Email đã tồn tại" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: String(username).trim(),
      email: normEmail,
      password: hash,               // ✅ lưu mật khẩu đã hash
      role: role || ["user"],
    });

    return res.status(201).json({
      message: "Đăng ký thành công",
      user: pickSafeUser(user),
    });
  } catch (e) {
    console.error("register error:", e);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// POST /api/user/login
export const login = async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || "");
    const user = await User.findOne({ email }).select("+password +refreshToken");
    if (!user) return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });

    const payload = {
      id: user._id,
      role: user.role,
      UserId: user.UserId,
      username: user.username,
    };

    const accessToken = signAccessToken(payload);
    const newRefresh = signRefreshToken({ id: user._id });

    user.refreshToken = newRefresh;            // ✅ lưu refreshToken hiện hành
    await user.save({ validateBeforeSave: false });

    return res.json({
      message: "Đăng nhập thành công",
      accessToken,
      refreshToken: newRefresh,
      user: pickSafeUser(user),
    });
  } catch (e) {
    console.error("login error:", e);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const loginSeller = async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || "");

    const user = await User.findOne({ email }).select("+password +refreshToken");
    if (!user) return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });

    // Nếu user chưa có role SELLER, add role
    if (!user.roles.includes(USER_ROLE.SELLER)) {
      user.roles = [...new Set([...user.roles, USER_ROLE.USER, USER_ROLE.SELLER])];
      user.roleStatus.SELLER = true; // mặc định mở quyền SELLER khi cấp role
      await user.save();
    }

    // ✅ Check nếu seller bị khóa
    if (user.roleStatus?.SELLER === false) {
      return res.status(403).json({ message: "Tài khoản SELLER của bạn đã bị khóa" });
    }

    const payload = {
      id: user._id,
      role: USER_ROLE.SELLER,
      userId: user.userId,
      username: user.username,
    };

    const accessToken = signAccessToken(payload);
    const newRefresh = signRefreshToken({ id: user._id });

    user.refreshToken = newRefresh;
    await user.save({ validateBeforeSave: false });

    return res.json({
      message: "Đăng nhập thành công",
      accessToken,
      refreshToken: newRefresh,
      user: pickSafeUser(user),
    });
  } catch (err) {
    console.error("loginSeller error:", err);
    return res.status(500).json({ message: "Lỗi server" });
  }
};



// POST /api/user/refresh-token
export const refreshToken = async (req, res) => {
  try {
    const rft = String(req.body?.refreshToken || "");
    if (!rft) return res.status(400).json({ message: "Thiếu refreshToken" });

    const decoded = verifyRefreshToken(rft); // sẽ throw nếu invalid/expired
    const user = await User.findById(decoded.id).select("refreshToken role UserId username email");
    if (!user || user.refreshToken !== rft) {
      return res.status(401).json({ message: "Refresh token không hợp lệ" });
    }

    const newAccess = signAccessToken({
      id: user._id,
      role: user.role,
      UserId: user.UserId,
      username: user.username,
    });

    return res.json({ accessToken: newAccess });
  } catch (e) {
    return res.status(401).json({ message: "Refresh token hết hạn/không hợp lệ" });
  }
};

// POST /api/user/logout   (yêu cầu middleware auth set req.user)
export const logout = async (req, res) => {
  try {
    const uid = req.user?.id;
    if (!uid) return res.status(401).json({ message: "Unauthorized" });
    await User.findByIdAndUpdate(uid, { $set: { refreshToken: null } }, { new: true });
    return res.json({ message: "Đã đăng xuất" });
  } catch (e) {
    console.error("logout error:", e);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

/* -------------------- Profile / Users -------------------- */

// GET /api/user/me
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });
    return res.json(pickSafeUser(user));
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// GET /api/user
export const getAllUser = async (req, res) => {
  try {
    const { page = 1, limit = 10, q } = req.query;
    const filter = q
      ? { $or: [{ username: new RegExp(q, "i") }, { email: new RegExp(q, "i") }] }
      : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).select("-password -refreshToken"),
      User.countDocuments(filter),
    ]);
    return res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// GET /api/user/:id
export const getUserById = async (req, res) => {
  try {
    const u = await User.findById(req.params.id).select("-password -refreshToken");
    if (!u) return res.status(404).json({ message: "User không tồn tại" });
    return res.json(u);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// PUT /api/user/:id
export const updateUser = async (req, res) => {
  try {
    // chỉ tự mình hoặc ADMIN
    const isSelf = String(req.user?.id) === String(req.params.id);
    const isAdmin = Array.isArray(req.user?.role)
      ? req.user.role.includes("ADMIN")
      : req.user?.role === "ADMIN";
    if (!isSelf && !isAdmin) return res.status(403).json({ message: "Forbidden" });

    const user = await User.findById(req.params.id).select("+password");
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    // email
    if (req.body?.email !== undefined) {
      const nextEmail = normalizeEmail(req.body.email);
      if (!nextEmail) return res.status(400).json({ message: "Email không hợp lệ" });
      const existed = await User.findOne({ email: nextEmail, _id: { $ne: user._id } });
      if (existed) return res.status(409).json({ message: "Email đã tồn tại" });
      user.email = nextEmail;
    }

    // username
    if (req.body?.username !== undefined) {
      user.username = String(req.body.username).trim();
    }

    // role – chỉ ADMIN
    if (req.body?.role !== undefined) {
      if (!isAdmin) return res.status(403).json({ message: "Chỉ ADMIN được thay đổi role" });
      user.role = Array.isArray(req.body.role) ? req.body.role : [req.body.role];
    }

    // password – hash tại controller nếu model không có pre('save')
    if (req.body?.password !== undefined) {
      const pwd = String(req.body.password);
      if (pwd.length < 6) return res.status(400).json({ message: "Mật khẩu tối thiểu 6 ký tự" });
      user.password = await bcrypt.hash(pwd, 10);
    }

    await user.save();
    return res.json({ message: "Cập nhật thành công", user: pickSafeUser(user) });
  } catch (e) {
    if (e?.code === 11000) return res.status(409).json({ message: "Email đã tồn tại" });
    return res.status(500).json({ message: e.message });
  }
};

// DELETE /api/user/:id
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User không tồn tại" });
    return res.status(200).json({ message: "Đã xóa user thành công" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// DELETE /api/user   (admin)
export const deleteAllUser = async (_req, res) => {
  try {
    await User.deleteMany();
    return res.status(200).json({ message: "Đã xóa toàn bộ user" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

/* -------------------- Forgot / Reset password -------------------- */

// POST /api/user/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const user = await User.findOne({ email }).select("+passwordResetToken +passwordResetExpires");
    // tránh lộ email có/không tồn tại
    if (!user) return res.status(200).json({ message: "Nếu email tồn tại, link đặt lại mật khẩu đã được gửi" });

    const { token, hash, expires } = createResetToken();
    user.passwordResetToken = hash;
    user.passwordResetExpires = new Date(expires);
    await user.save({ validateBeforeSave: false });

    // TODO: gửi email; tạm trả token để test
    return res.json({
      message: "Tạo token đặt lại mật khẩu thành công",
      token,                        // chỉ để test
      expiresAt: new Date(expires), // chỉ để test
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// POST /api/user/reset-password
export const resetPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const token = String(req.body?.token || "");
    const newPassword = String(req.body?.newPassword || "");

    const user = await User.findOne({ email }).select("+password +passwordResetToken +passwordResetExpires");
    if (!user || !user.passwordResetToken || !user.passwordResetExpires) {
      return res.status(400).json({ message: "Token không hợp lệ" });
    }

    const hash = crypto.createHash("sha256").update(token).digest("hex");
    const expired = Date.now() > new Date(user.passwordResetExpires).getTime();
    if (hash !== user.passwordResetToken || expired) {
      return res.status(400).json({ message: "Token đã hết hạn hoặc không hợp lệ" });
    }

    if (newPassword.length < 6) return res.status(400).json({ message: "Mật khẩu tối thiểu 6 ký tự" });
    user.password = await bcrypt.hash(newPassword, 10); // hash mới
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    return res.json({ message: "Đặt lại mật khẩu thành công" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

/* -------------------- Lock / Unlock Seller -------------------- */

// PATCH /api/user/:id/lock-seller
export const lockSeller = async (req, res) => {
  try {
    // chỉ ADMIN mới được khóa
    const isAdmin = Array.isArray(req.user?.role)
      ? req.user.role.includes(USER_ROLE.ADMIN)
      : req.user?.role === USER_ROLE.ADMIN;

    if (!isAdmin) return res.status(403).json({ message: "Chỉ ADMIN mới được khóa seller" });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    // nếu user không có role SELLER thì không cần khóa
    if (!user.role.includes(USER_ROLE.SELLER)) {
      return res.status(400).json({ message: "User này không có role SELLER" });
    }

    user.roleStatus = { ...user.roleStatus, SELLER: false };
    await user.save();

    return res.json({ message: "Đã khóa quyền SELLER", user: pickSafeUser(user) });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// PATCH /api/user/:id/unlock-seller
export const unlockSeller = async (req, res) => {
  try {
    // chỉ ADMIN mới được mở khóa
    const isAdmin = Array.isArray(req.user?.role)
      ? req.user.role.includes(USER_ROLE.ADMIN)
      : req.user?.role === USER_ROLE.ADMIN;

    if (!isAdmin) return res.status(403).json({ message: "Chỉ ADMIN mới được mở khóa seller" });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    if (!user.role.includes(USER_ROLE.SELLER)) {
      return res.status(400).json({ message: "User này không có role SELLER" });
    }

    user.roleStatus = { ...user.roleStatus, SELLER: true };
    await user.save();

    return res.json({ message: "Đã mở khóa quyền SELLER", user: pickSafeUser(user) });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
