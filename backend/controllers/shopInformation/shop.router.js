import express from "express"
import { createShopInformation, updateShopInformation, deleteAllShops, getAllShopInformation, deleteShopInformation } from "./shop.controller.js";
import { validBodyRequest } from "../../common/middleware/valid-body.middleware.js"
import { createShopInformationSchema, updateShopInformationSchema } from "./shop.schema.js";
import { authMiddleware, restrictTo } from "../../common/middleware/auth.js"
import { USER_ROLE } from "../../common/constant/enum.js";

const router = express.Router();

router.get("/", getAllShopInformation)
// router.get("/:id", getShopInformationById)
router.delete("/", deleteAllShops)
router.post(
    "/",
    authMiddleware,
    restrictTo(USER_ROLE.SELLER),
    validBodyRequest(createShopInformationSchema),
    createShopInformation
)

router.patch(
    "/:id",
    authMiddleware,
    restrictTo(USER_ROLE.SELLER, USER_ROLE.ADMIN),
    validBodyRequest(updateShopInformationSchema),
    updateShopInformation
)

router.delete(
    "/:id",
    authMiddleware,
    restrictTo(USER_ROLE.ADMIN),
    deleteShopInformation
)


const shopRouters = router;

export default shopRouters;
