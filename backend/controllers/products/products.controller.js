import Products from "./product.model.js";
import { createResponse } from "../../common/configs/respone.config.js";
import { handleAsync } from "../../common/utils/handle-asynce.config.js";
import { v2 as cloudinary } from "cloudinary";

// ✅ Lấy tất cả sản phẩm
export const getAllProduct = handleAsync(async (req, res) => {
  const products = await Products.find().sort({ createdAt: -1 });
  if (!products || products.length === 0)
    return createResponse(res, 404, "Không tìm thấy sản phẩm");
  return createResponse(res, 200, "Lấy danh sách sản phẩm thành công", products);
});

// ✅ Lấy 1 sản phẩm
export const getProduct = handleAsync(async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (!product) return createResponse(res, 404, "Không tìm thấy sản phẩm");
  return createResponse(res, 200, "Lấy sản phẩm thành công", product);
});

// ✅ Tạo sản phẩm + upload ảnh Cloudinary
export const createProduct = handleAsync(async (req, res) => {
  try {
    const { shopId, name, description, price, discount, category, weight, stock } = req.body;

    const images = req.files?.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    const product = await Products.create({
      shopId,
      name,
      description,
      price,
      discount,
      category,
      weight,
      stock,
      images,
    });

    return createResponse(res, 201, "✅ Tạo sản phẩm thành công", product);
  } catch (err) {
    console.error("Create product error:", err);
    return createResponse(res, 500, "Upload hoặc tạo sản phẩm thất bại", {
      error: err.message,
    });
  }
});

// ✅ Cập nhật sản phẩm (thêm ảnh mới nếu có)
export const updateProduct = handleAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      updateData.$push = {
        images: req.files.map((file) => ({
          url: file.path,
          public_id: file.filename,
        })),
      };
    }

    const product = await Products.findByIdAndUpdate(id, updateData, { new: true });
    if (!product) return createResponse(res, 404, "Không tìm thấy sản phẩm");

    return createResponse(res, 200, "Cập nhật sản phẩm thành công", product);
  } catch (err) {
    console.error("Update product error:", err);
    return createResponse(res, 500, "Lỗi cập nhật sản phẩm", { error: err.message });
  }
});

// ✅ Xóa sản phẩm + xóa ảnh Cloudinary
export const deleteProduct = handleAsync(async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  if (!product) return createResponse(res, 404, "Không tìm thấy sản phẩm");

  // Xóa ảnh khỏi Cloudinary
  for (const img of product.images) {
    try {
      await cloudinary.uploader.destroy(img.public_id);
    } catch (err) {
      console.warn("Không thể xóa ảnh:", img.public_id);
    }
  }

  await Products.findByIdAndDelete(id);
  return createResponse(res, 200, "🗑️ Xóa sản phẩm thành công");
});
