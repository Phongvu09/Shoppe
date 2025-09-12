import React, { useState } from "react";
import "./ShopInformation.css";
import { createShopInformation } from "../../../../api/shopInformation.js";
import { useNavigate } from "react-router-dom";

const ShopInformation = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        shopName: "",
        receiverName: "",
        phone: "",
        street: "",
        ward: "",
        district: "",
        city: "",
        commune: "",
        email: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.shopName) newErrors.shopName = "Vui lòng nhập tên shop";
        if (!formData.receiverName) newErrors.receiverName = "Vui lòng nhập tên người nhận";
        if (!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại";
        if (!formData.street) newErrors.street = "Vui lòng nhập số nhà, tên đường";
        if (!formData.ward) newErrors.ward = "Vui lòng nhập phường/xã";
        if (!formData.district) newErrors.district = "Vui lòng nhập quận/huyện";
        if (!formData.city) newErrors.city = "Vui lòng nhập tỉnh/thành phố";
        if (!formData.email) newErrors.email = "Vui lòng nhập email";
        return newErrors;
    };

    const handleSubmit = (e, action = "next") => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
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
                    Commune: formData.commune || ""
                },
                addressDetail: formData.street
            }
        };

        createShopInformation(payload)
            .then((response) => {
                console.log("Shop information saved:", response.data);
                if (action === "next") {
                    navigate("/shipping-form");
                } else if (action === "save") {
                    console.log("Thông tin đã được lưu tạm thời.");
                } else {
                    console.log("Unknown action:", action);
                }
            })
            .catch((error) => {
                console.error("Error saving shop information:", error);
            });
    };

    return (
        <div className="shop-info-container">
            <h2>Thông tin Shop</h2>
            <form onSubmit={handleSubmit} className="shop-info-form">
                {/* Tên Shop */}
                <label>
                    Tên Shop
                    <input
                        type="text"
                        name="shopName"
                        value={formData.shopName}
                        onChange={handleChange}
                        placeholder="Nhập tên shop"
                        className={errors.shopName ? "error" : ""}
                    />
                    {errors.shopName && <span className="error-text">{errors.shopName}</span>}
                </label>

                <h3>Địa chỉ lấy hàng</h3>

                <label>
                    Người nhận
                    <input
                        type="text"
                        name="receiverName"
                        value={formData.receiverName}
                        onChange={handleChange}
                        placeholder="Nguyễn Văn A"
                        className={errors.receiverName ? "error" : ""}
                    />
                    {errors.receiverName && <span className="error-text">{errors.receiverName}</span>}
                </label>

                <label>
                    Số điện thoại
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0987654321"
                        className={errors.phone ? "error" : ""}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                </label>

                <label>
                    Số nhà, tên đường
                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="123 Lý Thường Kiệt"
                        className={errors.street ? "error" : ""}
                    />
                    {errors.street && <span className="error-text">{errors.street}</span>}
                </label>

                <div className="form-inline">
                    <label>
                        Phường / Xã
                        <input
                            type="text"
                            name="ward"
                            value={formData.ward}
                            onChange={handleChange}
                            placeholder="Phường 5"
                            className={errors.ward ? "error" : ""}
                        />
                        {errors.ward && <span className="error-text">{errors.ward}</span>}
                    </label>

                    <label>
                        Thôn / Ấp
                        <input
                            type="text"
                            name="commune"
                            value={formData.commune}
                            onChange={handleChange}
                            placeholder="Ấp 1 (không bắt buộc)"
                        />
                    </label>
                </div>

                <div className="form-inline">
                    <label>
                        Quận / Huyện
                        <input
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            placeholder="Quận Tân Bình"
                            className={errors.district ? "error" : ""}
                        />
                        {errors.district && <span className="error-text">{errors.district}</span>}
                    </label>

                    <label>
                        Tỉnh / Thành phố
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="TP. Hồ Chí Minh"
                            className={errors.city ? "error" : ""}
                        />
                        {errors.city && <span className="error-text">{errors.city}</span>}
                    </label>
                </div>

                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className={errors.email ? "error" : ""}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </label>

                {/* Actions giống Identity/Tax */}
                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate(-1)}
                    >
                        Quay lại
                    </button>
                    <div className="right-buttons">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={(e) => handleSubmit(e, "save")}
                        >
                            Lưu
                        </button>
                        <button type="submit" className="btn-primary" onClick={(e) => handleSubmit(e, "next")}>
                            Tiếp theo
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ShopInformation;
