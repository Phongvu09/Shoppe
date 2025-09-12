import { createResponse } from "../../common/configs/respone.config.js"
import { handleAsync } from "../../common/utils/handle-asynce.config.js"
import * as TaxService from "./tax.service.js"
import MESSAGES from "./tax.message.js"

export const getAllTaxInformation = handleAsync(async (req, res) => {
    const taxes = await TaxService.getAllTaxInformationService()
    if (!taxes || taxes.length === 0) {
        createResponse(res, 400, MESSAGES.GET_FAILURE)
    }
    createResponse(res, 200, MESSAGES.GET_SUCCESS, taxes)
})

export const getTaxInformationById = handleAsync(async (req, res) => {
    const tax = await TaxService.getTaxInformationByIdService(req.params.id)

    if (!tax) {
        createResponse(res, 400, MESSAGES.NOT_FOUND)
    }
    createResponse(res, 200, MESSAGES.GET_SUCCESS, tax)
})

export const createTaxInformation = handleAsync(async (req, res) => {
    const tax = await TaxService.createTaxInformationService(req.body)

    if (!tax) {
        createResponse(res, 400, MESSAGES.CREATE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.CREATE_SUCCESS, tax)
})

export const updateTaxInformation = handleAsync(async (req, res) => {
    const tax = await TaxService.updateTaxInformationService(req.params.id, req.body)
    if (!tax) {
        createResponse(res, 400, MESSAGES.UPDATE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.UPDATE_SUCCESS, tax)
})

export const deleteTaxInformation = handleAsync(async (req, res) => {
    const tax = await TaxService.deleteTaxInformationService(req.params.id)

    if (!tax) {
        createResponse(res, 400, MESSAGES.DELETE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.DELETE_SUCCESS, tax)
})
