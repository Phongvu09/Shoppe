import { createResponse } from "../../common/configs/respone.config.js";
import { handleAsync } from "../../common/utils/handle-asynce.config.js";
import { MESSAGES } from "./auth.message.js";
import {
  registerService,
  loginService,
  checkHaveSellerRoleService,
  loginSellerService,
} from "./auth.service.js";
import Users from "../../models/Users.js";

/** Đăng ký */
export const authRegister = handleAsync(async (req, res) => {
  const newUser = await registerService(req.body);
  if (!newUser) return createResponse(res, 400, "Email đã tồn tại");
  return createResponse(res, 201, "Đăng ký thành công, vui lòng đăng nhập!");
});

/** Đăng nhập */
export const authLogin = handleAsync(async (req, res) => {
  const { user, accessToken } = await loginService(req.body);

  // user/accessToken null/undefined => sai thông tin
  if (!user || !accessToken) {
    return createResponse(res, 401, "Email hoặc mật khẩu không đúng");
  }

  // Nếu muốn set cookie:
  // res.cookie("access_token", accessToken, { httpOnly: true, sameSite: "lax" });

  return createResponse(res, 200, "Đăng nhập thành công", {
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    accessToken,
  });
});

/** Lấy thông tin user đang đăng nhập */
export const getMe = handleAsync(async (req, res) => {
  // requireAuth đã gắn req.user
  const id = req.user?._id || req.user?.id;
  if (!id) return createResponse(res, 401, "Unauthorized");

  const me = await Users.findById(id).select("-password");
  if (!me) return createResponse(res, 404, "User not found");

  return createResponse(res, 200, "OK", { user: me });
});

/** Đăng xuất */
export const logout = handleAsync(async (_req, res) => {
  // Nếu dùng cookie: res.clearCookie("access_token");
  return createResponse(res, 200, "Đăng xuất thành công");
});

/** Check role seller */
export const checkHaveSellerRole = handleAsync(async (req, res) => {
  const { email } = req.body;
  const isSeller = await checkHaveSellerRoleService(email);
  return createResponse(res, 200, MESSAGES.CHECK_ROLE_SUCCESS, { isSeller });
});

/** Đăng nhập seller */
export const loginSeller = handleAsync(async (req, res) => {
  const { user, accessToken } = await loginSellerService(req.body);
  if (!user || !accessToken) {
    return createResponse(res, 401, MESSAGES.LOGIN_FAILURE);
  }
  return createResponse(res, 200, MESSAGES.LOGIN_SUCCESS, { user, accessToken });
});
