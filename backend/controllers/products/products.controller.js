import { createResponse } from "../../common/configs/respone.config.js"
import { handleAsync } from "../../common/utils/handle-asynce.config.js"
import * as productService from "./product.service.js"
import MESSAGES from "./product.message.js"

export const getAllProduct = handleAsync(async (req, res) => {
    const products = await productService.getAllProductService()
    if (!products || products.length === 0) {
        createResponse(res, 400, MESSAGES.GET_FAILURE)
    }
    createResponse(res, 200, MESSAGES.GET_SUCCESS, products)
})

export const getProduct = handleAsync(async (req, res) => {
    const product = await productService.getProductService(req.params.id)

    if (!product) {
        createResponse(res, 400, MESSAGES.NOT_FOUND)
    }
    createResponse(res, 200, MESSAGES.GET_SUCCESS, product)
})

export const createProduct = handleAsync(async (req, res) => {
    const product = await productService.createProductService(req.body, req.files)

    if (!product) {
        createResponse(res, 400, MESSAGES.CREATE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.CREATE_SUCCESS, product)
})

export const updateProduct = handleAsync(async (req, res) => {
    const product = await productService.updateProductService(req.params.id, req.body)
    if (!product) {
        createResponse(res, 400, MESSAGES.UPDATE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.UPDATE_SUCCESS, product)
})

export const deleteProduct = handleAsync(async (req, res) => {
    const product = await productService.deleteProductService(req.params.id)

    if (!product) {
        createResponse(res, 400, MESSAGES.DELETE_FAILURE)
    }
    createResponse(res, 200, MESSAGES.DELETE_SUCCESS, product)
})

export const lockProduct = handleAsync(async (req, res) => {
    const product = await productService.lockProductService(req.params.id);

    if (!product) {
        return createResponse(res, 400, MESSAGES.NOT_FOUND);
    }
    return createResponse(res, 200, MESSAGES.LOCK_SUCCESS, product);
});

export const unlockProduct = handleAsync(async (req, res) => {
    const product = await productService.unlockProductService(req.params.id);

    if (!product) {
        return createResponse(res, 400, MESSAGES.NOT_FOUND);
    }
    return createResponse(res, 200, MESSAGES.UNLOCK_SUCCESS, product);
});
