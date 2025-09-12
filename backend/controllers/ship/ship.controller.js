// ship.controller.js
import Shipping from "../../models/Shipping.js";

// Tạo config shipping khi shop đăng ký
export const createShipping = async (req, res) => {
    try {
        const { shopId, methods } = req.body;

        const existing = await Shipping.findOne({ shopId });
        if (existing) {
            return res.status(400).json({ message: "Shop đã có cấu hình shipping rồi." });
        }

        const newShipping = new Shipping({ shopId, methods });
        await newShipping.save();

        res.status(201).json(newShipping);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getShippingByShop = async (req, res) => {
    try {
        const { shopId } = req.params;
        const shipping = await Shipping.findOne({ shopId });

        if (!shipping) return res.status(404).json({ message: "Không tìm thấy shipping config." });

        res.json(shipping);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateShipping = async (req, res) => {
    try {
        const { shopId } = req.params;
        const { methods } = req.body;

        const updated = await Shipping.findOneAndUpdate(
            { shopId },
            { methods },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: "Không tìm thấy shipping config." });

        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getALLShipping = async (req, res) => {
    try {
        const shipping = await Shipping.find();
        res.json(shipping);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
