import express from "express";
import Shops from "../../models/Shops.js";

export const createSaler = async (req, res) => {
    try {
        const { ownerId, shopName, email, phoneNumber, address } = req.body;

        const newSaler = new Shops({
            ownerId,
            shopName,
            email,
            phoneNumber,
            address: {
                FullName: address.FullName,
                phoneNumber: address.phoneNumber,
                address: {
                    "Province(City)": address.address["Province(City)"],
                    District: address.address.District,
                    Ward: address.address.Ward,
                    Commune: address.address.Commune || ""
                },
                addressDetail: address.addressDetail
            }
        });

        await newSaler.save();
        res.status(201).json(newSaler);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
