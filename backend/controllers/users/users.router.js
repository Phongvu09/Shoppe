import express from "express";
import { getAllUser, deleteUser, deleteAllUser } from "../users/users.controller.js";

const router = express.Router()

router.get("/users", getAllUser)
router.delete("/:id", deleteUser);  // Xoá user theo id
router.delete("/", deleteAllUser)

export default router
