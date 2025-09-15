import express from "express";
import User from "../../models/Users.js";

export const getAllUser = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User không tồn tại" });
        }

        res.status(200).json({ message: "Đã xóa user thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAllUser = async (req, res) => {
    try {
        await User.deleteMany()
        res.status(400).send({ message: "Delete all user" })
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}