// ship.router.js
import express from "express";
import { createShipping, getShippingByShop, updateShipping, getALLShipping } from "./ship.controller.js";

const router = express.Router();

router.post("/", createShipping);
router.get("/", getALLShipping);
router.get("/:shopId", getShippingByShop);
router.put("/:shopId", updateShipping);

export default router;
