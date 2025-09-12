import Products from "./product.model.js";
import { throwError } from "../../common/utils/errror.config.js";

export const createProductService = async (productData) => {
    const product = await Products.create(productData)
    return product
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