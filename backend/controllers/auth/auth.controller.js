import { createResponse } from "../../common/configs/respone.config.js";
import { handleAsync } from "../../common/utils/handle-asynce.config.js";
import { registerService, loginService } from "./auth.service.js";
import Users from "../../models/Users.js";

export const registerUser = handleAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await registerService({ username, email, password });
  if (!newUser) return createResponse(res, 400, "Email đã tồn tại");
  return createResponse(res, 201, "Đăng ký user thành công", { user: newUser });
});

export const registerSeller = handleAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const newSeller = await registerService({
    username,
    email,
    password,
    role: ["seller"],
  });
  if (!newSeller) return createResponse(res, 400, "Email đã tồn tại");
  return createResponse(res, 201, "Đăng ký seller thành công", { user: newSeller });
});

export const login = handleAsync(async (req, res) => {
  const { user, accessToken } = await loginService(req.body);
  if (!user || !accessToken) {
    console.log("Login failed:", req.body.email);
    return createResponse(res, 401, "Email hoặc mật khẩu không đúng");
  }

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

export const getMe = handleAsync(async (req, res) => {
  const id = req.user?._id || req.user?.id;
  if (!id) return createResponse(res, 401, "Unauthorized");

  const me = await Users.findById(id).select("-password");
  if (!me) return createResponse(res, 404, "User not found");

  return createResponse(res, 200, "OK", { user: me });
});

export const logout = handleAsync(async (_req, res) => {
  return createResponse(res, 200, "Đăng xuất thành công");
});
