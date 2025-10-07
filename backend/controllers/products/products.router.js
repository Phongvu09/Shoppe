import express from "express";
import {
    createProduct,
    updateProduct,
    getAllProduct,
    getProductById,
    deleteProduct,
    lockProduct,
    unlockProduct,
    getProductsByShop
} from "../products/products.controller.js";

import { validBodyWithFiles } from "../../common/middleware/valid-body.middleware.js";
import { createProductSchema, updateProductSchema } from "./product.schema.js";
import upload from "../../common/middleware/upload.middleware.js";
import { authMiddleware, restrictTo } from "../../common/middleware/auth.js";
import { USER_ROLE } from "../../common/constant/enum.js";

const router = express.Router();

router.get("/", getAllProduct);

// ✅ cần token seller
router.use(authMiddleware, restrictTo(USER_ROLE.SELLER));
router.get("/my-shop", getProductsByShop);
router.get("/:id", getProductById);
router.post("/", upload.array("images", 5), validBodyWithFiles(createProductSchema), createProduct);

// ✅ cần token admin/seller
router.use(authMiddleware, restrictTo(USER_ROLE.ADMIN, USER_ROLE.SELLER));
router.patch("/:id", upload.array("images", 5), validBodyWithFiles(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);
router.use(authMiddleware, restrictTo(USER_ROLE.ADMIN));
router.patch("/:id/lock", lockProduct);
router.patch("/:id/unlock", unlockProduct);

export default router;
