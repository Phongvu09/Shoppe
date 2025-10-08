import express from "express";
import {
  createProduct,
  updateProduct,
  getAllProduct,
  getProduct,
  deleteProduct,
} from "./products.controller.js";
import { upload } from "../../common/configs/cloudinary.config.js";

const router = express.Router();

// ✅ Route public cho FE
router.get("/", getAllProduct);
router.get("/:id", getProduct);

// ✅ Route cho Seller/Admin
router.post("/", upload.array("images", 5), createProduct);
router.patch("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
