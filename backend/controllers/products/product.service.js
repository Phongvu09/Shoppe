import Products from "./product.model.js";
import cloudinary from "../../common/configs/cloudinary.js"
import mongoose from "mongoose";

export const createProductService = async (productData, files = [], shopId) => {
    console.log("Service received shopId:", shopId); // Thêm log để debug
    if (!shopId) throw new Error("shopId is required");
    let images = [];

    if (files.length > 0) {
        for (const file of files) {
            try {
                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "products" },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result);
                        }
                    );
                    stream.end(file.buffer);
                });

                images.push({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            } catch (err) {
                console.error("Cloudinary upload error:", err);
                throw err;
            }
        }
    }

    const product = await Products.create({
        ...productData,
        images,
        shopId,
    });

    return product;
};

export const updateProductService = async (id, productData, files = []) => {
    const product = await Products.findById(id);
    if (!product) throw new Error("Product not found");

    // Xóa hết ảnh cũ trên Cloudinary
    for (const img of product.images) {
        if (img.public_id) {
            await cloudinary.uploader.destroy(img.public_id);
        }
    }

    // Upload ảnh mới nếu có files
    const newImages = [];
    for (const file of files) {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: "products" }, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
            stream.end(file.buffer);
        });
        newImages.push({ url: result.secure_url, public_id: result.public_id });
    }

    // Lưu product với toàn bộ ảnh mới
    Object.assign(product, { ...productData, images: newImages });
    await product.save();
    return product;
};




export const getAllProductService = async () => {
    const products = await Products.find()
        .select("name price discount description images");
    return products;
};

export const getProductsByShopService = async (shopId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit; // Tính số lượng sản phẩm cần bỏ qua
    const products = await Products.find({ shopId })
        .skip(skip)
        .limit(limit);
    const total = await Products.countDocuments({ shopId }); // Đếm tổng số sản phẩm
    return {
        products,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};

export const getProductByIdService = async (id) => {
    const product = await Products.findById(id)
    return product
}

export const getProductService = async (id) => {
    const product = await Products.findById(id).select("name price discount description images");
    return product;
};



export const deleteProductService = async (id) => {
    // Tìm product theo id
    const product = await Products.findById(id);
    if (!product) throw new Error("Product not found");

    // Xóa ảnh trên Cloudinary nếu có
    for (const img of product.images || []) {
        if (img.public_id) {
            await cloudinary.uploader.destroy(img.public_id);
        }
    }

    // Xóa document khỏi DB
    await Products.deleteOne({ _id: id });

    return product; // trả về dữ liệu cũ cho frontend
};

export const deleteAllProductsService = async (resetIndex = false) => {
    try {
        // 🧩 Kiểm tra collection tồn tại
        const collections = await mongoose.connection.db
            .listCollections({ name: Products.collection.name })
            .toArray();

        if (collections.length === 0) {
            console.log("Collection products chưa tồn tại.");
            return null;
        }

        // 🧹 Xóa ảnh trên Cloudinary
        const products = await Products.find();
        for (const product of products) {
            for (const img of product.images || []) {
                if (img.public_id) {
                    await cloudinary.uploader.destroy(img.public_id);
                }
            }
        }
        db.products.dropIndex("productId_1")


        if (resetIndex) {
            // 🔥 Xóa toàn bộ collection (data + index)
            await Products.collection.drop();
            console.log("Đã xóa toàn bộ dữ liệu và index trong collection products.");
            return { message: "Đã xóa toàn bộ dữ liệu và index" };
        } else {
            // ❗ Chỉ xóa dữ liệu
            await Products.deleteMany({});
            console.log("Đã xóa toàn bộ dữ liệu, giữ nguyên index.");
            return { message: "Đã xóa toàn bộ dữ liệu, giữ nguyên index" };
        }
    } catch (err) {
        if (err.codeName === "NamespaceNotFound") {
            console.warn("Collection products không tồn tại, không cần xóa.");
            return null;
        }

        console.error("Lỗi khi xóa toàn bộ products:", err);
        throw err;
    }
};

// Khóa sản phẩm
export const lockProductService = async (id) => {
    const product = await Products.findById(id);
    if (!product) return null;

    product.isActive = false;
    await product.save();
    return product;
};

// Mở khóa sản phẩm
export const unlockProductService = async (id) => {
    const product = await Products.findById(id);
    if (!product) return null;

    product.isActive = true;
    await product.save();
    return product;
};
