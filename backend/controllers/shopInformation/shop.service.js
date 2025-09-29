import Shop from "./Shops.model.js";

export const createShopInformation = async (shopData) => {
    try {
        const shop = await Shop.create(shopData);
        return shop;
    } catch (err) {
        if (err.code === 11000) {
            // lỗi trùng unique key
            throw new Error("Email hoặc số điện thoại đã tồn tại");
        }
        throw err; // ném tiếp lỗi khác
    }
};

export const getAllShopInformation = async () => {
    return await Shop.find();
};

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
