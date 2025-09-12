import { createResponse } from "../../common/configs/respone.config.js";
import { handleAsync } from "../../common/utils/handle-asynce.config.js";
import MESSAGES from "./auth.message.js";
import { authLoginService, autRegisterService } from "./auth.service.js";

export const authRegister = handleAsync(async (req, res) => {
    const newUser = await autRegisterService(req.body);
    if (!newUser) {
        createResponse(res, 400, MESSAGES.REGISTER_FAILURE);
    }
    createResponse(res, 200, MESSAGES.REGISTER_SUCCESS, newUser);
});

export const authLogin = handleAsync(async (req, res) => {
    const { user, accessToken } = await authLoginService(req.body);

    if (!user || !accessToken) {
        return createResponse(res, 400, MESSAGES.LOGIN_FAILURE);
    }

    return createResponse(res, 200, MESSAGES.LOGIN_SUCCESS, { user, accessToken });
});
