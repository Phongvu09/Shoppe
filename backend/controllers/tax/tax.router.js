import express from "express";
import { createTaxInformation, getAllTaxInformation, getTaxInformationById, deleteTaxInformation, updateTaxInformation } from "./tax.controller.js";
import { validBodyRequest } from "../../common/middleware/valid-body.middleware.js"
import { createTaxInformationSchema, updateTaxInformationSchema } from "./tax.schema.js";
import { authMiddleware, restrictTo } from "../../common/middleware/auth.js"
import { USER_ROLE } from "../../common/constant/enum.js";

const router = express.Router();

router.get("/", getAllTaxInformation)
router.get("/:id", getTaxInformationById)
// router.use(authMiddleware, restrictTo(USER_ROLE.ADMIN, USER_ROLE.MANAGER))
router.delete("/:id", deleteTaxInformation)
router.post("/createTaxInformation", validBodyRequest(createTaxInformationSchema), createTaxInformation)
router.patch("/:id", validBodyRequest(updateTaxInformationSchema), updateTaxInformation)


export default router;
