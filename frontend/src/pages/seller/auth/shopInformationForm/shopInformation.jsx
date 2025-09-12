import React, { useState } from "react";
import "./ShopInformation.css";
import { createShopInformation } from "../../../../api/shopInformation.js";

const ShopInformation = () => {
    const [formData, setFormData] = useState({
        shopName: "",
        receiverName: "",
        phone: "",
        street: "",
        ward: "",
        district: "",
        city: "",
        email: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.shopName) newErrors.shopName = "Vui lòng nhập tên shop";
        if (!formData.receiverName) newErrors.receiverName = "Vui lòng nhập tên người nhận";
        if (!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại";
        if (formData.phone && !/^0[0-9]{9}$/.test(formData.phone))
            newErrors.phone = "Số điện thoại không hợp lệ";
        if (!formData.street) newErrors.street = "Vui lòng nhập số nhà, tên đường";
        if (!formData.ward) newErrors.ward = "Vui lòng nhập phường/xã";
        if (!formData.district) newErrors.district = "Vui lòng nhập quận/huyện";
        if (!formData.city) newErrors.city = "Vui lòng nhập tỉnh/thành phố";
        if (!formData.email) newErrors.email = "Vui lòng nhập email";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Email không hợp lệ";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e, action = "next") => {
        e.preventDefault();

        if (!validateForm()) {
            console.log("Form chưa hợp lệ");
            return;
        }

        const payload = {
            shopName: formData.shopName,
            email: formData.email,
            phoneNumber: formData.phone,
            address: {
                FullName: formData.receiverName,
                phoneNumber: formData.phone,
                address: {
                    "Province(City)": formData.city,
                    District: formData.district,
                    Ward: formData.ward,
                    Commune: ""
                },
                addressDetail: formData.street
            }
        };

        createShopInformation(payload)
            .then((response) => {
                console.log("Shop information saved:", response.data);
                if (action === "next") {
                    console.log("👉 Chuyển sang bước tiếp theo...");
                } else {
                    console.log("👉 Thông tin đã được lưu.");
                }
            })
            .catch((error) => {
                console.error("❌ Error saving shop information:", error);
            });
    };

    return (
        <div className="shop-info-container">
            <h2>Thông tin Shop</h2>
            <form onSubmit={(e) => handleSubmit(e, "next")} className="shop-info-form">
                {/* Tên Shop */}
                <div className="form-group">
                    <label htmlFor="shopName">Tên Shop</label>
                    <input
                        type="text"
                        id="shopName"
                        name="shopName"
                        value={formData.shopName}
                        onChange={handleChange}
                        required
                    />
                    {errors.shopName && <span className="error">{errors.shopName}</span>}
                </div>

                <h3>Địa chỉ lấy hàng</h3>

                {/* Người nhận */}
                <div className="form-group">
                    <label htmlFor="receiverName">Tên người nhận</label>
                    <input
                        type="text"
                        id="receiverName"
                        name="receiverName"
                        value={formData.receiverName}
                        onChange={handleChange}
                        required
                    />
                    {errors.receiverName && (
                        <span className="error">{errors.receiverName}</span>
                    )}
                </div>

                {/* Điện thoại */}
                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>

                {/* Địa chỉ chi tiết */}
                <div className="form-group">
                    <label htmlFor="street">Số nhà, tên đường</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        required
                    />
                    {errors.street && <span className="error">{errors.street}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="ward">Phường / Xã</label>
                    <input
                        type="text"
                        id="ward"
                        name="ward"
                        value={formData.ward}
                        onChange={handleChange}
                        required
                    />
                    {errors.ward && <span className="error">{errors.ward}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="district">Quận / Huyện</label>
                    <input
                        type="text"
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        required
                    />
                    {errors.district && <span className="error">{errors.district}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="city">Tỉnh / Thành phố</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                    {errors.city && <span className="error">{errors.city}</span>}
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={(e) => handleSubmit(e, "save")}
                    >
                        Lưu
                    </button>
                    <button type="submit" className="btn-primary">
                        Tiếp theo
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ShopInformation;
