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
    const [loading, setLoading] = useState(false);

    // Xử lý thay đổi input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        const required = {
            shopName: "Vui lòng nhập tên shop",
            receiverName: "Vui lòng nhập tên người nhận",
            phone: "Vui lòng nhập số điện thoại",
            street: "Vui lòng nhập số nhà, tên đường",
            ward: "Vui lòng nhập phường/xã",
            district: "Vui lòng nhập quận/huyện",
            city: "Vui lòng nhập tỉnh/thành phố",
            email: "Vui lòng nhập email"
        };

        for (const key in required) {
            if (!formData[key]?.trim()) newErrors[key] = required[key];
        }
        return newErrors;
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const existingShopId = localStorage.getItem("shopId");
        if (existingShopId) {
            navigate("/seller/shipping-form");
            return;
        }

        const payload = {
            shopName: formData.shopName.trim(),
            email: formData.email.trim(),
            phoneNumber: formData.phone.trim(),
            pickupAddress: {
                fullName: formData.receiverName.trim(),
                phoneNumber: formData.phone.trim(),
                addressDetail: formData.street.trim(),
                address: {
                    province: formData.city.trim(),
                    district: formData.district.trim(),
                    ward: formData.ward.trim(),
                    commune: formData.commune.trim() || ""
                }
            }
        };

        try {
            setLoading(true);
            const response = await createShopInformation(payload);
            console.log("Shop information saved:", response);

            const newShopId = response?.shopId || response?.shop?._id;
            if (newShopId) localStorage.setItem("shopId", newShopId);

            navigate("/seller/shipping-form");
        } catch (error) {
            console.error("Lỗi khi lưu thông tin shop:", error);
            alert(error.message || "Không thể lưu thông tin shop. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    // Lưu tạm mà không chuyển trang
    const handleSave = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const payload = {
            shopName: formData.shopName.trim(),
            email: formData.email.trim(),
            phoneNumber: formData.phone.trim(),
            pickupAddress: {
                fullName: formData.receiverName.trim(),
                phoneNumber: formData.phone.trim(),
                addressDetail: formData.street.trim(),
                address: {
                    province: formData.city.trim(),
                    district: formData.district.trim(),
                    ward: formData.ward.trim(),
                    commune: formData.commune.trim() || ""
                }
            }
        };

        try {
            setLoading(true);
            const response = await createShopInformation(payload);
            console.log("Thông tin shop đã được lưu:", response);
            console.log("Shop ID mới:", response?.data?.data?._id || response?.data?._id || response?._id);
            const newShopId = response?.data?.data?._id || response?.data?._id || response?._id;
            if (newShopId) localStorage.setItem("shopId", newShopId);
            alert("Đã lưu thông tin shop tạm thời.");
        } catch (error) {
            console.error("Lỗi khi lưu thông tin shop:", error);
            alert(error.message || "Không thể lưu thông tin shop.");
        } finally {
            setLoading(false);
        }
    };



    const handleNext = () => {
        navigate
            ("/seller/shipping-form");
    }

    return (
        <div className="shop-info-container">
            <h2>Thông tin Shop</h2>
            <form onSubmit={handleSubmit} className="shop-info-form">
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

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate(-1)}
                        disabled={loading}
                    >
                        Quay lại
                    </button>
                    <div className="right-buttons">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={handleSave}
                            disabled={loading}
                        >
                            Lưu
                        </button>
                        <button
                            type="button"
                            className="btn-primary"
                            onClick={() => navigate("/seller/shipping-form")}
                        >
                            Tiếp theo
                        </button>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default ShopInformation;
