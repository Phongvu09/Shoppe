import { createResponse } from "../../common/configs/respone.config.js"
import { handleAsync } from "../../common/utils/handle-asynce.config.js"
import * as productService from "./product.service.js"
import MESSAGES from "./product.message.js"

export const getAllProduct = handleAsync(async (req, res) => {
    const products = await productService.getAllProductService()
    if (!products || products.length === 0) {
        return createResponse(res, 400, MESSAGES.GET_FAILURE)
    }
    return createResponse(res, 200, MESSAGES.GET_SUCCESS, products)
})

export const getProduct = handleAsync(async (req, res) => {
    const product = await productService.getProductService(req.params.id)

    if (!product) {
        return createResponse(res, 400, MESSAGES.NOT_FOUND)
    }
    return createResponse(res, 200, MESSAGES.GET_SUCCESS, product);
});

export const getProductById = handleAsync(async (req, res) => {
    const product = await productService.getProductByIdService(req.params.id)

    if (!product) {
        return createResponse(res, 400, MESSAGES.NOT_FOUND)
    }
    return createResponse(res, 200, MESSAGES.GET_SUCCESS, product)
})

export const updateProduct = handleAsync(async (req, res) => {
    try {
        console.log("req.body:", req.body);
        console.log("req.user:", req.user);
        console.log("req.files:", req.files);

        // Lấy shopId từ token decode
        const shopId = req.user?.id;
        if (!shopId) throw new Error("shopId is required");

        // Kiểm tra nếu product tồn tại
        const product = await productService.updateProductService(req.params.id, req.body, req.files);

        if (!product) {
            return createResponse(res, 400, MESSAGES.UPDATE_FAILURE);
        }

        return createResponse(res, 200, MESSAGES.UPDATE_SUCCESS, product);
    } catch (err) {
        console.error("Update product error:", err);
        return createResponse(res, 500, "Cập nhật sản phẩm thất bại", { error: err.message });
    }
});

export const deleteProduct = handleAsync(async (req, res) => {
    const product = await productService.deleteProductService(req.params.id)

    if (!product) {
        return createResponse(res, 400, MESSAGES.DELETE_FAILURE)
    }
    return createResponse(res, 200, MESSAGES.DELETE_SUCCESS, product)
})

export const lockProduct = handleAsync(async (req, res) => {
    const product = await productService.lockProductService(req.params.id)

    if (!product) {
        return createResponse(res, 400, MESSAGES.NOT_FOUND)
    }
    return createResponse(res, 200, MESSAGES.LOCK_SUCCESS, product)
})

export const unlockProduct = handleAsync(async (req, res) => {
    const product = await productService.unlockProductService(req.params.id)

    if (!product) {
        return createResponse(res, 400, MESSAGES.NOT_FOUND)
    }
    return createResponse(res, 200, MESSAGES.UNLOCK_SUCCESS, product)
})


export const createProduct = handleAsync(async (req, res) => {
    try {
        console.log("req.body:", req.body);
        console.log("req.user:", req.user);
        console.log("req.files:", req.files);

        // Lấy shopId từ token decode
        const shopId = req.user?.id;

        // Gọi service với shopId làm tham số riêng
        const product = await productService.createProductService(req.body, req.files, shopId);

        if (!product) return createResponse(res, 400, MESSAGES.CREATE_FAILURE);
        return createResponse(res, 200, MESSAGES.CREATE_SUCCESS, product);
    } catch (err) {
        console.error("Create product error:", err);
        return createResponse(res, 500, "Upload hoặc tạo sản phẩm thất bại", { error: err.message });
    }
});


export const getProductsByShop = handleAsync(async (req, res) => {
    const shopId = req.user.id; // Lấy từ token
    const { page = 1, limit = 10 } = req.query; // Lấy page và limit từ query

    const result = await productService.getProductsByShopService(
        shopId,
        parseInt(page),
        parseInt(limit)
    );

    if (!result.products || result.products.length === 0) {
        return createResponse(res, 404, "Không tìm thấy sản phẩm nào cho shop này");
    }

    return createResponse(res, 200, MESSAGES.GET_SUCCESS, {
        products: result.products,
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
    });
});

export const deleteAllProduct = handleAsync(async (req, res) => {
    const resetIndex = req.query.resetIndex === "true"; // lấy từ query
    const result = await productService.deleteAllProductsService(resetIndex);

    if (!result) {
        return createResponse(res, 404, "Không tìm thấy sản phẩm nào để xóa");
    }

    const message = resetIndex
        ? "Đã xóa toàn bộ dữ liệu + index sản phẩm"
        : "Đã xóa toàn bộ dữ liệu, giữ nguyên index";

    return createResponse(res, 200, message, result);
});