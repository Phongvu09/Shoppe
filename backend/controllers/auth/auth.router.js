import { Router } from "express";
import {
  authRegister,
  authLogin,
  getMe,
  logout,
} from "./auth.controller.js";
import { requireAuth } from "../../common/middleware/auth.js";

const router = Router();

// Auth
router.post("/register", authRegister);
router.post("/login", authLogin);
router.get("/me", requireAuth, getMe);
router.post("/logout", requireAuth, logout);



export default router;
