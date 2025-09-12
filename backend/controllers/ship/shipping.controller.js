import { createResponse } from "../../common/configs/respone.config.js"
import { handleAsync } from "../../common/utils/handle-asynce.config.js"
import * as ShippingService from "./shipping.service.js"
import MESSAGES from "./shipping.message.js"

export const getAllShippingInformation = handleAsync(async (req, res) => {
    const shippings = await ShippingService.getAllShippingInformation()
    if (!shippings || shippings.length === 0) {
        createResponse(res, 400, MESSAGES.GET_FAILURE)
    }
    createResponse(res, 200, MESSAGES.GET_SUCCESS, shippings)
})

export const getShippingInformationById = handleAsync(async (req, res) => {
    const shipping = await ShippingService.getShippingInformationById(req.params.id)

    if (!shipping) {
        createResponse(res, 400, MESSAGES.NOT_FOUND)
    }
    createResponse(res, 200, MESSAGES.GET_SUCCESS, shipping)
})

export const createShippingInformation = handleAsync(async (req, res) => {
    const shipping = await ShippingService.createShippingInformation(req.body)

    if (!shipping) {
        createResponse(res, 400, MESSAGES.CREATE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.CREATE_SUCCESS, shipping)
})

export const updateShippingInformation = handleAsync(async (req, res) => {
    const shipping = await ShippingService.updateShippingInformation(req.params.id, req.body)
    if (!shipping) {
        createResponse(res, 400, MESSAGES.UPDATE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.UPDATE_SUCCESS, shipping)
})

export const deleteShippingInformation = handleAsync(async (req, res) => {
    const shipping = await ShippingService.deleteShippingInformation(req.params.id)

    if (!shipping) {
        createResponse(res, 400, MESSAGES.DELETE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.DELETE_SUCCESS, shipping)
})
