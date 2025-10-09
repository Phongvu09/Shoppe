import Identity from "./identity.model.js";
import cloudinary from "../../common/configs/cloudinary.config.js";
import { z } from "zod";
import { createIdentitySchema } from "./identity.schema.js";


export const createIdentityService = async (data, files, shopId) => {
    if (!shopId) throw new Error("shopId is required");

    const uploadFile = async (file, folder) => {
        if (!file) return null;
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder }, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
            stream.end(file.buffer);
        });
        return { url: result.secure_url, public_id: result.public_id };
    };

    const frontImage = await uploadFile(files.frontImage?.[0], "identity");
    const backImage = await uploadFile(files.backImage?.[0], "identity");
    const selfieImage = await uploadFile(files.selfieImage?.[0], "identity");

    const identityPayload = {
        ...data,
        shopId,
        frontImage,
        backImage,
        selfieImage,
    };

    // Validate payload sau khi upload file
    createIdentitySchema.parse(identityPayload);

    return await Identity.create(identityPayload);
};



export const updateIdentityService = async (id, data, files) => {
    const identity = await Identity.findById(id);
    if (!identity) throw new Error("Identity not found");

    const uploadFile = async (file, folder) => {
        if (!file) return null;
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder }, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
            stream.end(file.buffer);
        });
        return result.secure_url; // <-- chỉ lưu URL
    };

    if (files.frontImage?.[0]) identity.frontImage = await uploadFile(files.frontImage[0], "identity");
    if (files.backImage?.[0]) identity.backImage = await uploadFile(files.backImage[0], "identity");
    if (files.selfieImage?.[0]) identity.selfieImage = await uploadFile(files.selfieImage[0], "identity");

    Object.assign(identity, data);
    await identity.save();
    return identity;
};


export const getAllIdentityService = async () => {
    return await Identity.find();
};

export const getIdentityService = async (id) => {
    return await Identity.findById(id);
};

export const getIdentityByIdService = async (id) => {
    return await Identity.findById(id);
};

export const getIdentitiesByShopService = async (shopId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const identities = await Identity.find({ shopId }).skip(skip).limit(limit);
    const total = await Identity.countDocuments({ shopId });
    return { identities, total, page, totalPages: Math.ceil(total / limit) };
};

export const deleteIdentityService = async (id) => {
    const identity = await Identity.findById(id);
    if (!identity) throw new Error("Identity not found");

    // Xóa ảnh
    for (const imgField of ["frontImage", "backImage", "selfieImage"]) {
        if (identity[imgField]?.public_id) {
            await cloudinary.uploader.destroy(identity[imgField].public_id);
        }
    }

    await Identity.deleteOne({ _id: id });
    return identity;
};
