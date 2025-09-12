import { createResponse } from "../../common/configs/respone.config.js"
import { handleAsync } from "../../common/utils/handle-asynce.config.js"
import * as ShopInformationService from "./shop.service.js"
import MESSAGES from "./shop.message.js"

export const getAllShopInformation = handleAsync(async (req, res) => {
    const shops = await ShopInformationService.getAllShopInformation()
    if (!shops || shops.length === 0) {
        createResponse(res, 400, MESSAGES.GET_FAILURE)
    }
    createResponse(res, 200, MESSAGES.GET_SUCCESS, shops)
})

export const getShopInformationById = handleAsync(async (req, res) => {
    const shop = await ShopInformationService.getShopInformationById(req.params.id)

    if (!shop) {
        createResponse(res, 400, MESSAGES.NOT_FOUND)
    }
    createResponse(res, 200, MESSAGES.GET_SUCCESS, shop)
})

export const createShopInformation = handleAsync(async (req, res) => {
    const shop = await ShopInformationService.createShopInformation(req.body)

    if (!shop) {
        createResponse(res, 400, MESSAGES.CREATE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.CREATE_SUCCESS, shop)
})

export const updateShopInformation = handleAsync(async (req, res) => {
    const shop = await ShopInformationService.updateShopInformation(req.params.id, req.body)
    if (!shop) {
        createResponse(res, 400, MESSAGES.UPDATE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.UPDATE_SUCCESS, shop)
})

export const deleteShopInformation = handleAsync(async (req, res) => {
    const shop = await ShopInformationService.deleteShopInformation(req.params.id)

    if (!shop) {
        createResponse(res, 400, MESSAGES.DELETE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.DELETE_SUCCESS, shop)
})
