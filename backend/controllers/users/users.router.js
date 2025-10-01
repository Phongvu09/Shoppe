import express from "express";
import {
  register,
  login,
  me,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  deleteAllUser,
  refreshToken,      // <-- dùng đúng tên export từ controller
  forgotPassword,
  resetPassword,
  loginSeller,
  lockSeller,
  unlockSeller,
} from "../users/users.controller.js";

import { authMiddleware as requireAuth, restrictTo as requireRole } from "../../common/middleware/auth.js";
import { USER_ROLE } from "../../common/constant/enum.js";

import { validate } from "../../common/middleware/validate.js";
import {
  registerSchema,
  loginSchema,
  updateUserSchema,
  refreshSchema,
  forgotSchema,
  resetSchema,
} from "./users.validation.js";

const router = express.Router();

/* ---------- Auth ---------- */
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/login-seller", validate(loginSchema), loginSeller)
router.post("/refresh-token", validate(refreshSchema), refreshToken);  // ✅ 1 dòng duy nhất
router.get("/me", requireAuth, me);
router.post("/forgot-password", validate(forgotSchema), forgotPassword);
router.post("/reset-password", validate(resetSchema), resetPassword);

/* ---------- CRUD ---------- */
// router.get("/", requireAuth, requireRole(USER_ROLE.ADMIN), getAllUser);
router.get("/", getAllUser);

router.get("/:id", getUserById);
router.patch("/:id", requireAuth, validate(updateUserSchema), updateUser);
router.delete("/:id", requireAuth, requireRole(USER_ROLE.ADMIN), deleteUser);
router.delete("/", requireAuth, requireRole(USER_ROLE.ADMIN), deleteAllUser);

/* ---------- Seller Lock / Unlock ---------- */
router.patch("/:id/lock-seller", requireAuth, requireRole(USER_ROLE.ADMIN), lockSeller);
router.patch("/:id/unlock-seller", requireAuth, requireRole(USER_ROLE.ADMIN), unlockSeller);

export default router;
