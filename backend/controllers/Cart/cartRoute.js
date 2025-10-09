import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
} from "./cartController.js";
import { requireAuth } from "../../common/middleware/auth.js"; 

const router = express.Router();

// ✅ Dùng requireAuth thay cho verifyToken
router.get("/", requireAuth, getCart);
router.post("/", requireAuth, addToCart);
router.delete("/:productId", requireAuth, removeFromCart);
router.put("/", requireAuth, updateQuantity);

export default router;
