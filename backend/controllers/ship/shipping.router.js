import express from "express";
import { createShippingInformation, updateShippingInformation, getAllShippingInformation, getShippingInformationById, deleteShippingInformation, deleteAllShipping } from "../ship/shipping.controller.js";
import { validBodyRequest } from "../../common/middleware/valid-body.middleware.js"
import { createShippingSchema, updateShippingSchema } from "./shipping.schema.js";
import { authMiddleware, restrictTo } from "../../common/middleware/auth.js"
import { USER_ROLE } from "../../common/constant/enum.js";
import { de } from "zod/v4/locales";

const router = express.Router();

router.get("/", getAllShippingInformation)
router.delete("/", deleteAllShipping)
router.get("/:id", getShippingInformationById)
// router.use(authMiddleware, restrictTo(USER_ROLE.ADMIN, USER_ROLE.MANAGER))
router.delete("/:id", deleteShippingInformation)
router.post("/", validBodyRequest(createShippingSchema), createShippingInformation)
router.patch("/:id", validBodyRequest(updateShippingSchema), updateShippingInformation)
const shipRouters = router;

export default shipRouters;
