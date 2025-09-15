import express from "express";
import { createShippingInformation, updateShippingInformation, getAllShippingInformation, getShippingInformationById, deleteShippingInformation } from "../ship/shipping.controller.js";
import { validBodyRequest } from "../../common/middleware/valid-body.middleware.js"
import { createShippingSchema, updateShippingSchema } from "./shipping.schema.js";
import { authMiddleware, restrictTo } from "../../common/middleware/auth.middleware.js"
import { USER_ROLE } from "../../common/constant/enum.js";

const router = express.Router();

router.get("/", getAllShippingInformation)
router.get("/:id", getShippingInformationById)
// router.use(authMiddleware, restrictTo(USER_ROLE.ADMIN, USER_ROLE.MANAGER))
router.delete("/:id", deleteShippingInformation)
router.post("/createShippingInformation", validBodyRequest(createShippingSchema), createShippingInformation)
router.patch("/:id", validBodyRequest(updateShippingSchema), updateShippingInformation)
const shipRouters = router;

export default shipRouters;
