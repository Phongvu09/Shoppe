import express from "express";
import { createShopInformation, updateShopInformation, getAllProduct, getShopInformationById, deleteShopInformation } from "./shopInformation.controller.js";
import { validBodyRequest } from "../../common/middleware/valid-body.middleware.js"
import { createShopInformationSchema, updateShopInformationSchema } from "./shop.schema.js";
import { authMiddleware, restrictTo } from "../../common/middleware/auth.middleware.js"
import { USER_ROLE } from "../../common/constant/enum.js";

const router = express.Router();

router.get("/", getAllProduct)
router.get("/:id", getShopInformationById)

// router.use(authMiddleware, restrictTo(USER_ROLE.ADMIN, USER_ROLE.MANAGER))
router.delete("/:id", deleteShopInformation)
router.post("/createShopInformation", validBodyRequest(createShopInformationSchema), createShopInformation)
router.patch("/:id", validBodyRequest(updateShopInformationSchema), updateShopInformation)


export default router;
