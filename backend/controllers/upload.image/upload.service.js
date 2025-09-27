import cloudinary from "../../common/configs/cloudinary";

export const uploadToCloudinaryService = async (filepath) => {
    return await cloudinary.uploader.upload(filepath, {
        folder: "products", //
    })
}

