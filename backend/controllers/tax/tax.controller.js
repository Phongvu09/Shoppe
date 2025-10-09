import { createResponse } from "../../common/configs/respone.config.js"
import { handleAsync } from "../../common/utils/handle-asynce.config.js"
import * as TaxService from "./tax.service.js"
import MESSAGES from "./tax.message.js"

export const getAllTaxInformation = handleAsync(async (req, res) => {
    const taxes = await TaxService.getAllTaxInformationService()
    if (!taxes || taxes.length === 0) {
        return createResponse(res, 400, MESSAGES.GET_FAILURE)
    }
    return createResponse(res, 200, MESSAGES.GET_SUCCESS, taxes)
})

export const getTaxInformationById = handleAsync(async (req, res) => {
    const tax = await TaxService.getTaxInformationByIdService(req.params.id)

    if (!tax) {
        return createResponse(res, 400, MESSAGES.NOT_FOUND)
    }
    return createResponse(res, 200, MESSAGES.GET_SUCCESS, tax)
})

export const createTaxInformation = handleAsync(async (req, res) => {
    const userId = req.user?.userId; // Lấy từ token
    const { shopId } = req.body;

    if (!userId) return createResponse(res, 401, "Unauthorized: missing userId");

    // Optional: kiểm tra xem shopId này có thuộc về user đang đăng nhập hay không
    // const shop = await Shop.findOne({ _id: shopId, userId });
    // if (!shop) return createResponse(res, 403, "Bạn không có quyền thêm thuế cho shop này");

    const tax = await TaxService.createTaxInformationService(req.body);

    if (!tax) return createResponse(res, 400, MESSAGES.CREATE_FAILURE);
    return createResponse(res, 200, MESSAGES.CREATE_SUCCESS, tax);
});


export const updateTaxInformation = handleAsync(async (req, res) => {
    const tax = await TaxService.updateTaxInformationService(req.params.id, req.body)
    if (!tax) {
        return createResponse(res, 400, MESSAGES.UPDATE_FAILURE)
    }
    return createResponse(res, 200, MESSAGES.UPDATE_SUCCESS, tax)
})

export const deleteTaxInformation = handleAsync(async (req, res) => {
    const tax = await TaxService.deleteTaxInformationService(req.params.id)

    if (!tax) {
        return createResponse(res, 400, MESSAGES.DELETE_FAILURE)
    }
    return createResponse(res, 200, MESSAGES.DELETE_SUCCESS, tax)
})
