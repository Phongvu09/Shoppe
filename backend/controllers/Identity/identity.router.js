import express from "express";
import {
    createIdentity,
    updateIdentity,
    getAllIdentity,
    getIdentityById,
    deleteIdentity,
    getIdentitiesByShop,
    getIdentity
} from "./identity.controller.js";

import { authMiddleware, restrictTo } from "../../common/middleware/auth.js";
import { USER_ROLE } from "../../common/constant/enum.js";
import upload from "../../common/middleware/upload.middleware.js";

const router = express.Router();

// Public GET
router.get("/", getAllIdentity);
router.get("/:id", getIdentity);

// Seller-only routes
router.use(authMiddleware, restrictTo(USER_ROLE.SELLER));

router.get("/my-shop", getIdentitiesByShop);

// CREATE Identity
router.post(
    "/",
    upload.fields([
        { name: "frontImage", maxCount: 1 },
        { name: "backImage", maxCount: 1 },
        { name: "selfieImage", maxCount: 1 },
    ]),
    createIdentity
);

// UPDATE Identity
router.patch(
    "/:id",
    upload.fields([
        { name: "frontImage", maxCount: 1 },
        { name: "backImage", maxCount: 1 },
        { name: "selfieImage", maxCount: 1 },
    ]),
    updateIdentity
);

// DELETE Identity
router.delete("/:id", deleteIdentity);

export default router;
