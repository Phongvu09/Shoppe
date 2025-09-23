import express from "express";
import { createProduct, updateProduct, getAllProduct, getProduct, deleteProduct } from "../products/products.controller.js";
import { validBodyRequest } from "../../common/middleware/valid-body.middleware.js"
import { createProductSchema, updateProductSchema } from "./product.schema.js";
import { authMiddleware, restrictTo } from "../../common/middleware/auth.js"
import { USER_ROLE } from "../../common/constant/enum.js";

const router = express.Router();

router.get("/", getAllProduct)
router.get("/:id", getProduct)

// router.use(authMiddleware, restrictTo(USER_ROLE.ADMIN, USER_ROLE.MANAGER))
router.delete("/:id", deleteProduct)
router.post("/createProduct", validBodyRequest(createProductSchema), createProduct)
router.patch("/:id", validBodyRequest(updateProductSchema), updateProduct)


export default router;
