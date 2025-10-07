import { createResponse } from "../../common/configs/respone.config.js"
import { handleAsync } from "../../common/utils/handle-asynce.config.js"
import * as productService from "./product.service.js"
import MESSAGES from "./product.message.js"

export const getAllProduct = handleAsync(async (req, res) => {
  const products = await productService.getAllProductService();
  if (!products || products.length === 0) {
    return createResponse(res, 404, "Không tìm thấy sản phẩm");
  }
  return createResponse(res, 200, "Lấy danh sách sản phẩm thành công", products);
});

export const getProduct = handleAsync(async (req, res) => {
  const product = await productService.getProductService(req.params.id);
  if (!product) {
    return createResponse(res, 404, "Không tìm thấy sản phẩm");
  }
  return createResponse(res, 200, "Lấy sản phẩm thành công", product);
});

export const createProduct = handleAsync(async (req, res) => {
    try {
        const product = await productService.createProductService(req.body, req.files);

        if (!product) {
            return createResponse(res, 400, MESSAGES.CREATE_FAILURE);
        }

        return createResponse(res, 200, MESSAGES.CREATE_SUCCESS, product);
    } catch (err) {
        console.error("Create product error:", err);
        return createResponse(res, 500, "Upload hoặc tạo sản phẩm thất bại", { error: err.message });
    }
});

export const updateProduct = handleAsync(async (req, res) => {
    // Nếu có req.body.images mới từ middleware
    const product = await productService.updateProductService(req.params.id, req.body);

    if (!product) {
        return createResponse(res, 400, MESSAGES.UPDATE_FAILURE);
    }
    return createResponse(res, 200, MESSAGES.UPDATE_SUCCESS, product);
});



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
