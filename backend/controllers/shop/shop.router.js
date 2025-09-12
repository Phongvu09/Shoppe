import express from "express";
import { createSaler } from "./shop.controller.js";

const router = express.Router()

router.post("/saler", createSaler)


export default router
