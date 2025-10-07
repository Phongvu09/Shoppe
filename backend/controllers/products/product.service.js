import Products from "./product.model.js";
import cloudinary from "../../common/configs/cloudinary.js"

export const createProductService = async (productData, files = []) => {
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
                throw err; // break và báo lỗi ngay
            }
        }
    }

    const product = await Products.create({
        ...productData,
        images,
    });

    return product;
};


export const getAllProductService = async () => {
  const products = await Products.find()
    .select("name price discount description images"); 
  return products;
};

export const getProductService = async (id) => {
  const product = await Products.findById(id).select("name price discount description images");
  return product;
};



export const deleteProductService = async (id) => {
    const product = await Products.findByIdAndDelete(id)
};

export const updateProductService = async (id, productData, files = []) => {
    const product = await Products.findById(id);
    if (!product) return null;

    // Upload ảnh mới nếu có
    if (files.length > 0) {
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "products",
            });
            product.images.push({
                url: result.secure_url,
                public_id: result.public_id,
            });
        }
    }

    // Cập nhật các field khác
    Object.assign(product, productData);
    await product.save();

    return product;
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
