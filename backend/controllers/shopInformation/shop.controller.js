import { createResponse } from "../../common/configs/respone.config.js"
import { handleAsync } from "../../common/utils/handle-asynce.config.js"
import * as ShopInformationService from "./shop.service.js"
import MESSAGES from "./shop.message.js"

export const getAllShopInformation = handleAsync(async (req, res) => {
    const shops = await ShopInformationService.getAllShopInformation()
    if (!shops || shops.length === 0) {
        return createResponse(res, 400, MESSAGES.GET_FAILURE)
    }
    return createResponse(res, 200, MESSAGES.GET_SUCCESS, shops)
})

export const getShopInformationById = handleAsync(async (req, res) => {
    const shop = await ShopInformationService.getShopInformationById(req.params.id)

    if (!shop) {
        return createResponse(res, 400, MESSAGES.NOT_FOUND)
    }
    return createResponse(res, 200, MESSAGES.GET_SUCCESS, shop)
})

export const createShopInformation = async (req, res) => {
    try {
        console.log("req.user:", req.user);   // 👀 log để kiểm tra
        console.log("req.body:", req.body);

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: missing user" });
        }

        const shopData = { ...req.body, userId: req.user.id };
        const shop = await ShopInformationService.createShopInformation(shopData);

        return res.status(201).json({
            message: "Tạo shop thành công",
            data: shop,
        });
    } catch (err) {
        console.error("Create shop error:", err);
        return res.status(500).json({ message: err.message || "Lỗi tạo shop" });
    }
};




export const updateShopInformation = handleAsync(async (req, res) => {
    const shop = await ShopInformationService.updateShopInformation(req.params.id, req.body)
    if (!shop) {
        return createResponse(res, 400, MESSAGES.UPDATE_FAILURE)
    }
    return createResponse(res, 200, MESSAGES.UPDATE_SUCCESS, shop)
})

export const deleteShopInformation = handleAsync(async (req, res) => {
    const shop = await ShopInformationService.deleteShopInformation(req.params.id)

    if (!shop) {
        return createResponse(res, 400, MESSAGES.DELETE_FAILURE)
    }
    return createResponse(res, 200, MESSAGES.DELETE_SUCCESS, shop)
})
