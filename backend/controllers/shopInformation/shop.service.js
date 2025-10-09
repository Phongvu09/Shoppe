import Shop from "./Shops.model.js";
import mongoose from "mongoose";

export const createShopInformation = async (shopData) => {
    try {
        const shop = await Shop.create(shopData);
        return shop;
    } catch (err) {
        console.error("Error creating shop:", err);
        if (err.code === 11000) throw new Error("Email hoặc số điện thoại đã tồn tại");
        throw err;
    }
};

export const getAllShopInformation = async () => Shop.find();

export const updateShopInformation = async (id, shopData) => {
    const shop = await Shop.findByIdAndUpdate(id, shopData, { new: true });
    if (!shop) throw new Error("Shop not found");
    return shop;
};

export const deleteShopInformation = async (id) => {
    const shop = await Shop.findByIdAndDelete(id);
    if (!shop) throw new Error("Shop not found");
    return shop;
};

export const getShopInformationById = async (id) => {
    const shop = await Shop.findById(id);
    if (!shop) throw new Error("Shop not found");
    return shop;
};

// ✅ Gộp xóa toàn bộ + xóa index "shopId_1"
export const deleteAllShops = async () => {
    const collection = mongoose.connection.collection("shops");
    const result = await Shop.deleteMany({});

    const indexes = await collection.indexes();
    const hasShopIdIndex = indexes.some((idx) => idx.name === "shopId_1");
    if (hasShopIdIndex) await collection.dropIndex("shopId_1");

    return { deletedCount: result.deletedCount, indexDropped: hasShopIdIndex };
};
