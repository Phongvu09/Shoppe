import Products from "./product.model.js";
import cloudinary from "../../common/configs/cloudinary.js";

export const createProductService = async (productData, files) => {
    let images = [];

    if (files && files.length > 0) {
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "products",
            });
            images.push({
                url: result.secure_url,
                public_id: result.public_id,
            });
        }
    }

    const product = await Products.create({
        ...productData,
        images,
    });
    return product;
};


export const getAllProductService = async () => {
    const products = await Products.find();
    return products
}

export const getProductService = async (id) => {
    const product = await Products.findById(id)
    return product
}

export const deleteProductService = async (id) => {
    const product = await Products.findByIdAndDelete(id)
};

export const updateProductService = async (id) => {
    const product = await Products.findByIdAndUpdate(id, productData, {
        new: true,
    })
    return product
}

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
