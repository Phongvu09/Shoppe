import React, { useState } from "react";
import "./IdentityForm.css";
import { useNavigate } from "react-router-dom";
import { createIdentity } from "../../../../api/identity.js";

const IdentityForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        idType: "CCCD",
        idNumber: "",
        issuedDate: "",
        issuedPlace: "",
        frontImage: null,
        backImage: null,
        selfieImage: null,
        email: "",
        phoneNumber: "",
        address: {
            country: "Việt Nam",
            province: "",
            district: "",
            ward: "",
            street: "",
        },
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: "" });
    };

    const handleAddressChange = (field, value) => {
        setFormData({
            ...formData,
            address: { ...formData.address, [field]: value },
        });
        setErrors({ ...errors, [field]: "" });
    };

    const handleFileChange = (field, file) => {
        setFormData({ ...formData, [field]: file });
        setErrors({ ...errors, [field]: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = "Vui lòng nhập họ và tên";
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Vui lòng chọn ngày sinh";
        if (!formData.idNumber) newErrors.idNumber = "Vui lòng nhập số giấy tờ";
        if (!formData.issuedDate) newErrors.issuedDate = "Vui lòng chọn ngày cấp";
        if (!formData.issuedPlace) newErrors.issuedPlace = "Vui lòng nhập nơi cấp";
        if (!formData.frontImage) newErrors.frontImage = "Vui lòng tải ảnh mặt trước";
        if (!formData.backImage) newErrors.backImage = "Vui lòng tải ảnh mặt sau";
        if (!formData.selfieImage) newErrors.selfieImage = "Vui lòng tải ảnh selfie";
        if (!formData.email) newErrors.email = "Vui lòng nhập email";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Vui lòng nhập số điện thoại";
        if (!formData.address.province) newErrors.province = "Vui lòng nhập tỉnh/thành phố";
        if (!formData.address.district) newErrors.district = "Vui lòng nhập quận/huyện";
        if (!formData.address.ward) newErrors.ward = "Vui lòng nhập phường/xã";
        if (!formData.address.street) newErrors.street = "Vui lòng nhập số nhà, tên đường";
        return newErrors;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const shopId = localStorage.getItem("shopId");
        const payload = new FormData();
        payload.append("shopId", shopId);
        payload.append("fullName", formData.fullName);
        payload.append("dateOfBirth", formData.dateOfBirth);
        payload.append("idType", formData.idType);
        payload.append("idNumber", formData.idNumber);
        payload.append("issuedDate", formData.issuedDate);
        payload.append("issuedPlace", formData.issuedPlace);
        payload.append("email", formData.email);
        payload.append("phoneNumber", formData.phoneNumber);
        payload.append("frontImage", formData.frontImage);
        payload.append("backImage", formData.backImage);
        payload.append("selfieImage", formData.selfieImage);

        Object.entries(formData.address).forEach(([key, value]) => {
            payload.append(`address[${key}]`, value);
        });

        try {
            setLoading(true);
            const res = await createIdentity(payload);
            console.log("Identity saved:", res);
            alert("Thông tin định danh đã được lưu tạm thời.");
        } catch (error) {
            console.error("Lỗi khi lưu định danh:", error);
            alert("Không thể lưu định danh. Thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const handleNext = async (e) => {
        e.preventDefault();
        navigate("/seller/shipping-form"); // route tiếp theo
    };

    const handleBack = () => {
        navigate(-1); // quay lại trang trước
    };

    return (
        <div className="identity-form-container">
            <h2>Thông tin định danh</h2>
            <form className="identity-form">
                <label>
                    Họ và tên
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        className={errors.fullName ? "error" : ""}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </label>

                <label>
                    Ngày sinh
                    <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                        className={errors.dateOfBirth ? "error" : ""}
                    />
                    {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
                </label>

                <label>
                    Loại giấy tờ
                    <select value={formData.idType} onChange={(e) => handleChange("idType", e.target.value)}>
                        <option value="CCCD">CCCD</option>
                        <option value="CMND">CMND</option>
                        <option value="Passport">Passport</option>
                    </select>
                </label>

                <label>
                    Số giấy tờ
                    <input
                        type="text"
                        value={formData.idNumber}
                        onChange={(e) => handleChange("idNumber", e.target.value)}
                        className={errors.idNumber ? "error" : ""}
                    />
                    {errors.idNumber && <span className="error-text">{errors.idNumber}</span>}
                </label>

                <label>
                    Ngày cấp
                    <input
                        type="date"
                        value={formData.issuedDate}
                        onChange={(e) => handleChange("issuedDate", e.target.value)}
                        className={errors.issuedDate ? "error" : ""}
                    />
                    {errors.issuedDate && <span className="error-text">{errors.issuedDate}</span>}
                </label>

                <label>
                    Nơi cấp
                    <input
                        type="text"
                        value={formData.issuedPlace}
                        onChange={(e) => handleChange("issuedPlace", e.target.value)}
                        className={errors.issuedPlace ? "error" : ""}
                    />
                    {errors.issuedPlace && <span className="error-text">{errors.issuedPlace}</span>}
                </label>

                <label>
                    Ảnh mặt trước
                    <input type="file" onChange={(e) => handleFileChange("frontImage", e.target.files[0])} />
                    {errors.frontImage && <span className="error-text">{errors.frontImage}</span>}
                </label>

                <label>
                    Ảnh mặt sau
                    <input type="file" onChange={(e) => handleFileChange("backImage", e.target.files[0])} />
                    {errors.backImage && <span className="error-text">{errors.backImage}</span>}
                </label>

                <label>
                    Ảnh selfie
                    <input type="file" onChange={(e) => handleFileChange("selfieImage", e.target.files[0])} />
                    {errors.selfieImage && <span className="error-text">{errors.selfieImage}</span>}
                </label>

                <label>
                    Email
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={errors.email ? "error" : ""}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </label>

                <label>
                    Số điện thoại
                    <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleChange("phoneNumber", e.target.value)}
                        className={errors.phoneNumber ? "error" : ""}
                    />
                    {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
                </label>

                <h3>Địa chỉ</h3>
                {["province", "district", "ward", "street"].map((field) => (
                    <label key={field}>
                        {field === "province" ? "Tỉnh/Thành phố" :
                            field === "district" ? "Quận/Huyện" :
                                field === "ward" ? "Phường/Xã" :
                                    "Số nhà, tên đường"}
                        <input
                            type="text"
                            value={formData.address[field]}
                            onChange={(e) => handleAddressChange(field, e.target.value)}
                            className={errors[field] ? "error" : ""}
                        />
                        {errors[field] && <span className="error-text">{errors[field]}</span>}
                    </label>
                ))}

                <div className="form-actions">
                    <button type="button" onClick={handleBack} disabled={loading}>
                        Quay lại
                    </button>
                    <button type="button" onClick={handleSave} disabled={loading}>
                        Lưu tạm
                    </button>
                    <button type="button" onClick={handleNext} disabled={loading}>
                        Tiếp theo
                    </button>
                </div>
            </form>
        </div>
    );
};

export default IdentityForm;
