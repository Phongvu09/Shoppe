import { createResponse } from "../../common/configs/respone.config.js";
import { handleAsync } from "../../common/utils/handle-asynce.config.js";
import MESSAGES from "./auth.message.js";
import {
    authLoginService,
    autRegisterService,
    checkHaveSellerRoleService,
    loginSellerService
} from "./auth.service.js";

// Đăng ký
export const authRegister = handleAsync(async (req, res) => {
    const newUser = await autRegisterService(req.body);
    if (!newUser) {
        return createResponse(res, 400, MESSAGES.REGISTER_FAILURE);
    }
    return createResponse(res, 200, MESSAGES.REGISTER_SUCCESS, newUser);
});

// Đăng nhập thường
export const authLogin = handleAsync(async (req, res) => {
    const { user, accessToken } = await authLoginService(req.body);

    if (!user || !accessToken) {
        return createResponse(res, 400, MESSAGES.LOGIN_FAILURE);
    }
    return createResponse(res, 200, MESSAGES.LOGIN_SUCCESS, { user, accessToken });
});

// Check role Seller
export const checkHaveSellerRole = handleAsync(async (req, res) => {
    const { email } = req.body;
    const isSeller = await checkHaveSellerRoleService(email);
    return createResponse(res, 200, MESSAGES.CHECK_ROLE_SUCCESS, { isSeller });
});

// Đăng nhập Seller
export const loginSeller = handleAsync(async (req, res) => {
    const { user, accessToken } = await loginSellerService(req.body);

    if (!user || !accessToken) {
        return createResponse(res, 400, MESSAGES.LOGIN_FAILURE);
    }
    return createResponse(res, 200, MESSAGES.LOGIN_SUCCESS, { user, accessToken });
});
