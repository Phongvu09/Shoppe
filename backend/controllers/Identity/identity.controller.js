import { createResponse } from "../../common/configs/respone.config.js";
import { handleAsync } from "../../common/utils/handle-asynce.config.js";
import * as identityService from "./identity.service.js";
import MESSAGES from "./identity.message.js";

export const getAllIdentity = handleAsync(async (req, res) => {
    const identities = await identityService.getAllIdentityService();
    if (!identities || identities.length === 0)
        return createResponse(res, 404, MESSAGES.GET_FAILURE);
    return createResponse(res, 200, MESSAGES.GET_SUCCESS, identities);
});

export const getIdentity = handleAsync(async (req, res) => {
    const identity = await identityService.getIdentityService(req.params.id);
    if (!identity) return createResponse(res, 404, MESSAGES.NOT_FOUND);
    return createResponse(res, 200, MESSAGES.GET_SUCCESS, identity);
});

export const getIdentityById = handleAsync(async (req, res) => {
    const identity = await identityService.getIdentityByIdService(req.params.id);
    if (!identity) return createResponse(res, 404, MESSAGES.NOT_FOUND);
    return createResponse(res, 200, MESSAGES.GET_SUCCESS, identity);
});

export const getIdentitiesByShop = handleAsync(async (req, res) => {
    const shopId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const result = await identityService.getIdentitiesByShopService(shopId, parseInt(page), parseInt(limit));

    if (!result.identities || result.identities.length === 0)
        return createResponse(res, 404, "Không tìm thấy danh sách định danh cho shop này");

    return createResponse(res, 200, MESSAGES.GET_SUCCESS, {
        identities: result.identities,
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
    });
});

export const createIdentity = handleAsync(async (req, res) => {
    try {
        const shopId = req.user?.id;
        const files = req.files || {};

        const data = {
            ...req.body,
            shopId,
            frontImage: files.frontImage?.[0] || null,
            backImage: files.backImage?.[0] || null,
            selfieImage: files.selfieImage?.[0] || null,
            address: req.body.address ? JSON.parse(req.body.address) : {},
        };

        const identity = await identityService.createIdentityService(data);
        if (!identity) return createResponse(res, 400, "Tạo định danh thất bại");
        return createResponse(res, 200, "Tạo định danh thành công", identity);
    } catch (err) {
        console.error("Create identity error:", err);
        return createResponse(res, 500, "Tạo định danh thất bại", { error: err.message });
    }
});



export const updateIdentity = handleAsync(async (req, res) => {
    try {
        const files = req.files || {};
        const identity = await identityService.updateIdentityService(req.params.id, req.body, files);
        if (!identity) return createResponse(res, 400, MESSAGES.UPDATE_FAILURE);
        return createResponse(res, 200, MESSAGES.UPDATE_SUCCESS, identity);
    } catch (err) {
        console.error("Update identity error:", err);
        return createResponse(res, 500, "Cập nhật định danh thất bại", { error: err.message });
    }
});

export const deleteIdentity = handleAsync(async (req, res) => {
    const identity = await identityService.deleteIdentityService(req.params.id);
    if (!identity) return createResponse(res, 400, MESSAGES.DELETE_FAILURE);
    return createResponse(res, 200, MESSAGES.DELETE_SUCCESS, identity);
});
