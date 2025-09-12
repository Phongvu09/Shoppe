import { createResponse } from "../../common/configs/respone.config.js"
import { handleAsync } from "../../common/utils/handle-asynce.config.js"
import * as IdentityService from "./identity.service.js"
import MESSAGES from "./identity.message.js"

export const getAllIdentityInformation = handleAsync(async (req, res) => {
    const identities = await IdentityService.getAllIdentityInformationService()
    if (!identities || identities.length === 0) {
        createResponse(res, 400, MESSAGES.GET_FAILURE)
    }
    createResponse(res, 200, MESSAGES.GET_SUCCESS, identities)
})

export const getIdentityInformationById = handleAsync(async (req, res) => {
    const identity = await IdentityService.getIdentityInformationByIdService(req.params.id)

    if (!identity) {
        createResponse(res, 400, MESSAGES.NOT_FOUND)
    }
    createResponse(res, 200, MESSAGES.GET_SUCCESS, identity)
})

export const createIdentityInformation = handleAsync(async (req, res) => {
    const identity = await IdentityService.createIdentityInformationService(req.body)

    if (!identity) {
        createResponse(res, 400, MESSAGES.CREATE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.CREATE_SUCCESS, identity)
})

export const updateIdentityInformation = handleAsync(async (req, res) => {
    const identity = await IdentityService.updateIdentityInformationService(req.params.id, req.body)
    if (!identity) {
        createResponse(res, 400, MESSAGES.UPDATE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.UPDATE_SUCCESS, identity)
})

export const deleteIdentityInformation = handleAsync(async (req, res) => {
    const identity = await IdentityService.deleteIdentityInformationService(req.params.id)

    if (!identity) {
        createResponse(res, 400, MESSAGES.DELETE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.DELETE_SUCCESS, identity)
})
