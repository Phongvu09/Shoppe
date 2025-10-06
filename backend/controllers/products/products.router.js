import express from "express";
import {
    createProduct,
    updateProduct,
    getAllProduct,
    getProduct,
    deleteProduct,
    lockProduct,
    unlockProduct
} from "../products/products.controller.js";
// import { uploadToCloudinary, upload } from "../../common/utils/uploadToCloudinary.js";

import { validBodyRequest, validBodyWithFiles } from "../../common/middleware/valid-body.middleware.js";
import { createProductSchema, updateProductSchema } from "./product.schema.js";
import upload from "../../common/middleware/upload.middleware.js";
import { authMiddleware, restrictTo } from "../../common/middleware/auth.js";
import { USER_ROLE } from "../../common/constant/enum.js";

const router = express.Router();

router.get("/", getAllProduct);
router.get("/:id", getProduct);

// router.use(authMiddleware, restrictTo(USER_ROLE.SELLER))

router.post("/", upload.array("images", 5), validBodyWithFiles(createProductSchema), createProduct);
// router.use(authMiddleware, restrictTo(USER_ROLE.ADMIN, USER_ROLE.MANAGER))
router.patch("/:id", upload.array("images", 5), validBodyWithFiles(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

// router.use(authMiddleware, restrictTo(USER_ROLE.ADMIN)
router.patch("/:id/lock", lockProduct);
router.patch("/:id/unlock", unlockProduct);

export default router;
