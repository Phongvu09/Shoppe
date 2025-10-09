import { createResponse } from "../../common/configs/respone.config.js";
import { handleAsync } from "../../common/utils/handle-asynce.config.js";
import * as ShopInformationService from "./shop.service.js";
import MESSAGES from "./shop.message.js";

export const createShopInformation = handleAsync(async (req, res) => {
    const { shopName, email, phoneNumber, pickupAddress } = req.body;
    const userId = req.user?.id;

    if (!userId) return createResponse(res, 401, "Unauthorized: missing userId");

    // ✅ Chuẩn hóa dữ liệu frontend → model mongoose
    const shopData = {
        userId,
        shopName,
        email,
        phoneNumber,
        pickupAddress: {
            receiverName: pickupAddress.fullName,
            phone: pickupAddress.phoneNumber,
            street: pickupAddress.addressDetail,
            ward: pickupAddress.address.ward,
            district: pickupAddress.address.district,
            city: pickupAddress.address.province,
            commune: pickupAddress.address.commune || "",
        },
    };

    try {
        const newShop = await ShopInformationService.createShopInformation(shopData);
        return createResponse(res, 201, MESSAGES.CREATE_SUCCESS, newShop);
    } catch (err) {
        console.error("❌ Error creating shop:", err);
        const message = err.message || MESSAGES.CREATE_FAILURE;
        return createResponse(res, 500, message);
    }
});

export const getAllShopInformation = handleAsync(async (req, res) => {
    const shops = await ShopInformationService.getAllShopInformation();
    if (!shops?.length) return createResponse(res, 404, MESSAGES.GET_FAILURE);
    return createResponse(res, 200, MESSAGES.GET_SUCCESS, shops);
});

export const updateShopInformation = handleAsync(async (req, res) => {
    const updatedShop = await ShopInformationService.updateShopInformation(req.params.id, req.body);
    return createResponse(res, 200, MESSAGES.UPDATE_SUCCESS, updatedShop);
});

export const deleteShopInformation = handleAsync(async (req, res) => {
    const deletedShop = await ShopInformationService.deleteShopInformation(req.params.id);
    return createResponse(res, 200, MESSAGES.DELETE_SUCCESS, deletedShop);
});

// ✅ Kết hợp deleteAll + xóa index lỗi
export const deleteAllShops = handleAsync(async (req, res) => {
    try {
        const result = await ShopInformationService.deleteAllShops();
        return createResponse(res, 200, "Đã xóa toàn bộ shop và dọn index", result);
    } catch (err) {
        return createResponse(res, 400, "Không thể xóa toàn bộ shop hoặc index", { error: err.message });
    }
});
