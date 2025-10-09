// backend/controllers/auth/auth.router.js
import { Router } from "express";
import {
  registerUser,
  registerSeller,
  login,
  getMe,
  logout,
} from "./auth.controller.js";
import { requireAuth } from "../../common/middleware/auth.js";

const router = Router();

// USER + SELLER Auth
router.post("/register", registerUser);
router.post("/register-seller", registerSeller);
router.post("/login", login);
router.get("/me", requireAuth, getMe);
router.post("/logout", requireAuth, logout);

export default router;
