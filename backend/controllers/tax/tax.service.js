import Tax from "./tax.model.js";
import { throwError } from "../../common/utils/errror.config.js";

export const createTaxInformationService = async (taxData) => {
    const tax = await Tax.create(taxData);
    return tax;
};

export const getAllTaxInformationService = async () => {
    const taxes = await Tax.find();
    return taxes;
};

export const updateTaxInformationService = async (id, taxData) => {
    const tax = await Tax.findByIdAndUpdate(id, taxData, {
        new: true,
    });
    return tax;
}

export const deleteTaxInformationService = async (id) => {
    const tax = await Tax.findByIdAndDelete(id);
    return tax;
}

export const getTaxInformationByIdService = async (id) => {
    const tax = await Tax.findById(id);
    if (!tax) {
        throwError(404, "Tax not found");
    }
    return tax;
}