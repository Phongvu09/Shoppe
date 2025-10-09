import Shipping from "./shipping.model.js";
import { throwError } from "../../common/utils/errror.config.js";

// Tạo mới shipping
export const createShippingInformation = async (data) => {
    const shipping = await Shipping.create(data);
    return shipping;
};

// Lấy tất cả shipping
export const getAllShippingInformation = async () => {
    return await Shipping.find();
};

// Lấy theo ID
export const getShippingInformationById = async (id) => {
    const shipping = await Shipping.findById(id);
    if (!shipping) throwError(404, "Shipping not found");
    return shipping;
};

// Lấy theo shopId (dùng để check trùng)
export const getShippingByShopId = async (shopId) => {
    return await Shipping.findOne({ shopId });
};

// Update
export const updateShippingInformation = async (id, data) => {
    const shipping = await Shipping.findByIdAndUpdate(id, data, { new: true });
    return shipping;
};

// Delete
export const deleteShippingInformation = async (id) => {
    const shipping = await Shipping.findByIdAndDelete(id);
    return shipping;
};

export const deleteAllShipping = async () => {
    await Shipping.deleteMany({});
}       