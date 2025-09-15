import express from "express"
import { authRegister, authLogin, checkHaveSellerRole, loginSeller } from "./auth.controller.js"
import { validBodyRequest } from "../../common/middleware/valid-body.middleware.js"
import { authLoginSchema, authRegisterSchema } from "./auth.schema.js"

const authRouter = express.Router()

authRouter.post("/register", validBodyRequest(authRegisterSchema), authRegister)
authRouter.post("/login", validBodyRequest(authLoginSchema), authLogin)
authRouter.post("/check-seller", checkHaveSellerRole)
authRouter.post("/login-seller", validBodyRequest(authLoginSchema), loginSeller)


export default authRouter;