// src/modules/tax/tax.route.js
import express from "express";
import {
    createTaxInformation,
    getAllTaxInformation,
    getTaxInformationById,
    deleteTaxInformation,
    updateTaxInformation,
} from "./tax.controller.js";
import { validBodyRequest } from "../../common/middleware/valid-body.middleware.js";
import { taxSchema } from "./tax.schema.js";
import { authMiddleware, restrictTo } from "../../common/middleware/auth.js";
import { USER_ROLE } from "../../common/constant/enum.js";

const router = express.Router();

router.get(
    "/",
    // authMiddleware,
    // restrictTo(USER_ROLE.ADMIN, USER_ROLE.MANAGER),
    getAllTaxInformation
);

router.get(
    "/:id",
    authMiddleware,
    restrictTo(USER_ROLE.SELLER, USER_ROLE.ADMIN),
    getTaxInformationById
);

router.post(
    "/",
    authMiddleware,
    restrictTo(USER_ROLE.SELLER),
    validBodyRequest(taxSchema),
    createTaxInformation
);

router.patch(
    "/:id",
    authMiddleware,
    restrictTo(USER_ROLE.SELLER),
    validBodyRequest(taxSchema),
    updateTaxInformation
);

router.delete(
    "/:id",
    authMiddleware,
    restrictTo(USER_ROLE.ADMIN),
    deleteTaxInformation
);

const taxRouters = router;
export default taxRouters;
