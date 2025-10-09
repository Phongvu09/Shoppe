import Products from "./product.model.js";
import { createResponse } from "../../common/configs/respone.config.js";
import { handleAsync } from "../../common/utils/handle-asynce.config.js";
import { v2 as cloudinary } from "cloudinary";
import * as productService from "./product.service.js";
import MESSAGES from "./product.message.js";

// ✅ Lấy tất cả sản phẩm
export const getAllProduct = handleAsync(async (req, res) => {
    const products =
        (await productService.getAllProductService()) ||
        (await Products.find().sort({ createdAt: -1 }));

    if (!products || products.length === 0)
        return createResponse(res, 404, "Không tìm thấy sản phẩm");

    return createResponse(res, 200, "Lấy danh sách sản phẩm thành công", products);
});

// ✅ Lấy 1 sản phẩm
export const getProduct = handleAsync(async (req, res) => {
    const product =
        (await productService.getProductService(req.params.id)) ||
        (await Products.findById(req.params.id));

    if (!product)
        return createResponse(res, 404, "Không tìm thấy sản phẩm");

    return createResponse(res, 200, "Lấy sản phẩm thành công", product);
});

// ✅ Tạo sản phẩm
export const createProduct = handleAsync(async (req, res) => {
    try {
        console.log("req.body:", req.body);
        console.log("req.user:", req.user);
        console.log("req.files:", req.files);

        const shopId = req.user?.id || req.body.shopId;
        if (!shopId) throw new Error("shopId is required");

        // Dữ liệu ảnh (nếu có)
        const images = req.files?.map((file) => ({
            url: file.path,
            public_id: file.filename,
        }));

        // Gọi service, fallback qua create trực tiếp
        const product =
            (await productService.createProductService(req.body, req.files, shopId)) ||
            (await Products.create({ ...req.body, shopId, images }));

        if (!product) return createResponse(res, 400, "Tạo sản phẩm thất bại");
        return createResponse(res, 200, "Tạo sản phẩm thành công", product);
    } catch (err) {
        console.error("Create product error:", err);
        return createResponse(res, 500, "Upload hoặc tạo sản phẩm thất bại", {
            error: err.message,
        });
    }
});

// ✅ Cập nhật sản phẩm
export const updateProduct = handleAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const shopId = req.user?.id;

        let updated =
            (await productService.updateProductService(id, req.body, req.files)) || null;

        if (!updated) {
            // fallback trực tiếp vào DB nếu service không có
            const updateData = { ...req.body };
            if (req.files && req.files.length > 0) {
                updateData.$push = {
                    images: req.files.map((file) => ({
                        url: file.path,
                        public_id: file.filename,
                    })),
                };
            }
            updated = await Products.findByIdAndUpdate(id, updateData, { new: true });
        }

        if (!updated)
            return createResponse(res, 404, "Không tìm thấy sản phẩm");

        return createResponse(res, 200, "Cập nhật sản phẩm thành công", updated);
    } catch (err) {
        console.error("Update product error:", err);
        return createResponse(res, 500, "Cập nhật sản phẩm thất bại", {
            error: err.message,
        });
    }
});

// ✅ Xóa sản phẩm (kèm Cloudinary)
export const deleteProduct = handleAsync(async (req, res) => {
    const { id } = req.params;

    const product =
        (await productService.deleteProductService(id)) ||
        (await Products.findById(id));

    if (!product)
        return createResponse(res, 404, "Không tìm thấy sản phẩm");

    if (product.images && product.images.length > 0) {
        for (const img of product.images) {
            try {
                await cloudinary.uploader.destroy(img.public_id);
            } catch {
                console.warn("Không thể xóa ảnh:", img.public_id);
            }
        }
    }

    await Products.findByIdAndDelete(id);
    return createResponse(res, 200, "🗑️ Xóa sản phẩm thành công");
});

// ✅ Khóa / mở khóa sản phẩm
export const lockProduct = handleAsync(async (req, res) => {
    const product = await productService.lockProductService(req.params.id);
    if (!product)
        return createResponse(res, 404, "Không tìm thấy sản phẩm");
    return createResponse(res, 200, "Khóa sản phẩm thành công", product);
});

export const unlockProduct = handleAsync(async (req, res) => {
    const product = await productService.unlockProductService(req.params.id);
    if (!product)
        return createResponse(res, 404, "Không tìm thấy sản phẩm");
    return createResponse(res, 200, "Mở khóa sản phẩm thành công", product);
});

// ✅ Lấy sản phẩm theo shop
export const getProductsByShop = handleAsync(async (req, res) => {
    const shopId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const result = await productService.getProductsByShopService(
        shopId,
        parseInt(page),
        parseInt(limit)
    );

    if (!result.products || result.products.length === 0)
        return createResponse(res, 404, "Không tìm thấy sản phẩm nào cho shop này");

    return createResponse(res, 200, "Lấy sản phẩm thành công", {
        products: result.products,
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
    });
});

// ✅ Xóa toàn bộ sản phẩm
export const deleteAllProduct = handleAsync(async (req, res) => {
    const resetIndex = req.query.resetIndex === "true";
    const result = await productService.deleteAllProductsService(resetIndex);

    if (!result)
        return createResponse(res, 404, "Không tìm thấy sản phẩm nào để xóa");

    const message = resetIndex
        ? "Đã xóa toàn bộ dữ liệu + index sản phẩm"
        : "Đã xóa toàn bộ dữ liệu, giữ nguyên index";

    return createResponse(res, 200, message, result);
});

export const getProductById = handleAsync(async (req, res) => {
    const product = await productService.getProductByIdService(req.params.id);
    if (!product) return createResponse(res, 404, "Không tìm thấy sản phẩm");
    return createResponse(res, 200, "Lấy sản phẩm thành công", product);
});
