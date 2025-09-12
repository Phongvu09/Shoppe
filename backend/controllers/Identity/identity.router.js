import express from "express";
import { createIdentityInformation, getAllIdentityInformation, getIdentityInformationById, updateIdentityInformation, deleteIdentityInformation } from "../Identity/identity.controller.js";
import { validBodyRequest } from "../../common/middleware/valid-body.middleware.js"
import { createIdentitySchema, updateIdentitySchema } from "./identity.schema.js";
import { authMiddleware, restrictTo } from "../../common/middleware/auth.middleware.js"
import { USER_ROLE } from "../../common/constant/enum.js";

const router = express.Router();

router.get("/", getAllIdentityInformation)
router.get("/:id", getIdentityInformationById)

// router.use(authMiddleware, restrictTo(USER_ROLE.ADMIN, USER_ROLE.MANAGER))
router.delete("/:id", deleteIdentityInformation)
router.post("/createIdentityInformation", validBodyRequest(createIdentitySchema), createIdentityInformation)
router.patch("/:id", validBodyRequest(updateIdentitySchema), updateIdentityInformation)


export default router;
