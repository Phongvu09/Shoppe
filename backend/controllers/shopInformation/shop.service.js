import Shop from "./Shops.model.js";
import { throwError } from "../../common/utils/errror.config.js";

export const createShopInformation = async (shopData) => {
    const shop = await Shop.create(shopData);
    return shop;
};

export const getAllShopInformation = async () => {
    const shops = await Shop.find();
    return shops;
};

export const updateShopInformation = async (id, shopData) => {
    const shop = await Shop.findByIdAndUpdate(id, shopData, {
        new: true,
    });
    return shop;
}

export const deleteShopInformation = async (id) => {
    const shop = await Shop.findByIdAndDelete(id);
    return shop;
}

export const getShopInformationById = async (id) => {
    const shop = await Shop.findById(id);
    if (!shop) {
        throwError(404, "Shop not found");
    }
    return shop;
}