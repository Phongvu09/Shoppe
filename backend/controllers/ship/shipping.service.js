import Shipping from "./shipping.model.js";
import { throwError } from "../../common/utils/errror.config.js";

export const createShipping = async (shippingData) => {
    const shipping = await Shipping.create(shippingData);
    return shipping;
};

export const getAllShippingInformation = async () => {
    const shippings = await Shipping.find();
    return shippings;
};

export const updateShippingInformation = async (id, shippingData) => {
    const shipping = await Shipping.findByIdAndUpdate(id, shippingData, {
        new: true,
    });
    return shipping;
}

export const deleteShippingInformation = async (id) => {
    const shipping = await Shipping.findByIdAndDelete(id);
    return shipping;
}

export const getShippingInformationById = async (id) => {
    const shipping = await Shipping.findById(id);
    if (!shipping) {
        throwError(404, "Shipping not found");
    }
    return shipping;
}