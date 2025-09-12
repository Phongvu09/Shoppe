import React, { useState } from "react";
import "./ShopInformation.css";

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Shop Info Submitted:", formData);
        // TODO: gọi API để lưu thông tin shop
    };

    return (
        <div className="shop-info-container">
            <h2>Thông tin Shop</h2>
            <form onSubmit={handleSubmit} className="shop-info-form">
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
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-secondary">
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
