import Identity from "./identity.model.js";
import { throwError } from "../../common/utils/errror.config.js";

export const createIdentityInformationService = async (identityData) => {
    const identity = await Identity.create(identityData);
    return identity;
};

export const getAllIdentityInformationService = async () => {
    const identities = await Identity.find();
    return identities;
};

export const updateIdentityInformationService = async (id, identityData) => {
    const identity = await Identity.findByIdAndUpdate(id, identityData, {
        new: true,
    });
    return identity;
}

export const deleteIdentityInformationService = async (id) => {
    const identity = await Identity.findByIdAndDelete(id);
    return identity;
}

export const getIdentityInformationByIdService = async (id) => {
    const identity = await Identity.findById(id);
    if (!identity) {
        throwError(404, "Identity not found");
    }
    return identity;
}