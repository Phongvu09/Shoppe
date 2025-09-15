import { useState } from "react";
import "./IdentityForm.css";
import { useNavigate } from "react-router-dom";
import { createIdentity } from "../../../../api/identity.js";

export default function IdentityForm({ onSubmit }) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
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

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
        setErrors({ ...errors, [field]: "" });
    };

    const handleAddressChange = (field, value) => {
        setForm({
            ...form,
            address: { ...form.address, [field]: value },
        });
        setErrors({
            ...errors,
            address: { ...errors.address, [field]: "" },
        });
    };

    const handleFileChange = (field, file) => {
        setForm({ ...form, [field]: file });
        setErrors({ ...errors, [field]: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.fullName) newErrors.fullName = "Vui lòng nhập họ và tên";
        if (!form.dateOfBirth) newErrors.dateOfBirth = "Vui lòng chọn ngày sinh";
        if (!form.idNumber) newErrors.idNumber = "Vui lòng nhập số giấy tờ";
        if (!form.issuedDate) newErrors.issuedDate = "Vui lòng chọn ngày cấp";
        if (!form.issuedPlace) newErrors.issuedPlace = "Vui lòng nhập nơi cấp";
        if (!form.frontImage) newErrors.frontImage = "Vui lòng tải ảnh mặt trước";
        if (!form.backImage) newErrors.backImage = "Vui lòng tải ảnh mặt sau";
        if (!form.selfieImage) newErrors.selfieImage = "Vui lòng tải ảnh selfie";
        if (!form.email) newErrors.email = "Vui lòng nhập email";
        if (!form.phoneNumber) newErrors.phoneNumber = "Vui lòng nhập số điện thoại";
        if (!form.address.province) newErrors.province = "Vui lòng nhập tỉnh/thành phố";
        if (!form.address.district) newErrors.district = "Vui lòng nhập quận/huyện";
        if (!form.address.ward) newErrors.ward = "Vui lòng nhập phường/xã";
        if (!form.address.street) newErrors.street = "Vui lòng nhập số nhà, tên đường";
        return newErrors;
    };

    const handleSubmit = (e, action = "next") => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const shopId = localStorage.getItem("shopId");

        const payload = {
            shopId,
            fullName: form.fullName,
            dateOfBirth: form.dateOfBirth,
            idType: form.idType,
            idNumber: form.idNumber,
            issuedDate: form.issuedDate,
            issuedPlace: form.issuedPlace,
            email: form.email,
            phoneNumber: form.phoneNumber,
            address: {
                country: form.address.country,
                province: form.address.province,
                district: form.address.district,
                ward: form.address.ward,
                street: form.address.street,
            },
            // ảnh ở đây mình để base64 (nếu backend chỉ nhận JSON)
            frontImage: form.frontImage,
            backImage: form.backImage,
            selfieImage: form.selfieImage,
        };

        createIdentity(payload)
            .then((response) => {
                console.log("Identity saved:", response.data);

                if (action === "next") {
                    navigate("/");
                } else if (action === "save") {
                    console.log("Thông tin định danh đã được lưu tạm thời.");
                }
            })
            .catch((error) => {
                console.error("Error saving identity:", error);
            });
        console.log("Form submitted:", form);
    };


    return (
        <div className="identity-form-container">
            <h2>Thông tin Định danh</h2>
            <form className="identity-form">
                {/* Họ tên */}
                <div className="form-group">
                    <label>
                        Họ và tên <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className={errors.fullName ? "error" : ""}
                    />
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                {/* Ngày sinh */}
                <div className="form-group">
                    <label>
                        Ngày sinh <span className="required">*</span>
                    </label>
                    <input
                        type="date"
                        value={form.dateOfBirth}
                        onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                        className={errors.dateOfBirth ? "error" : ""}
                    />
                    {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                </div>

                {/* Loại giấy tờ */}
                <div className="form-group">
                    <label>Loại giấy tờ</label>
                    <select
                        value={form.idType}
                        onChange={(e) => handleChange("idType", e.target.value)}
                    >
                        <option value="CCCD">CCCD</option>
                        <option value="CMND">CMND</option>
                        <option value="Passport">Passport</option>
                    </select>
                </div>

                {/* Số giấy tờ */}
                <div className="form-group">
                    <label>
                        Số giấy tờ <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.idNumber}
                        onChange={(e) => handleChange("idNumber", e.target.value)}
                        placeholder="0123456789"
                        className={errors.idNumber ? "error" : ""}
                    />
                    {errors.idNumber && <span className="error-message">{errors.idNumber}</span>}
                </div>

                {/* Ngày cấp */}
                <div className="form-group">
                    <label>
                        Ngày cấp <span className="required">*</span>
                    </label>
                    <input
                        type="date"
                        value={form.issuedDate}
                        onChange={(e) => handleChange("issuedDate", e.target.value)}
                        className={errors.issuedDate ? "error" : ""}
                    />
                    {errors.issuedDate && <span className="error-message">{errors.issuedDate}</span>}
                </div>

                {/* Nơi cấp */}
                <div className="form-group">
                    <label>
                        Nơi cấp <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.issuedPlace}
                        onChange={(e) => handleChange("issuedPlace", e.target.value)}
                        placeholder="Cục Cảnh sát QLHC"
                        className={errors.issuedPlace ? "error" : ""}
                    />
                    {errors.issuedPlace && <span className="error-message">{errors.issuedPlace}</span>}
                </div>

                {/* Upload ảnh */}
                <fieldset className="upload-section">
                    <legend>Ảnh giấy tờ <span className="required">*</span></legend>

                    <label>
                        Ảnh mặt trước:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange("frontImage", e.target.files[0])}
                            className={errors.frontImage ? "error" : ""}
                        />
                        {errors.frontImage && <span className="error-message">{errors.frontImage}</span>}
                    </label>

                    <label>
                        Ảnh mặt sau:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange("backImage", e.target.files[0])}
                            className={errors.backImage ? "error" : ""}
                        />
                        {errors.backImage && <span className="error-message">{errors.backImage}</span>}
                    </label>

                    <label>
                        Ảnh selfie:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange("selfieImage", e.target.files[0])}
                            className={errors.selfieImage ? "error" : ""}
                        />
                        {errors.selfieImage && <span className="error-message">{errors.selfieImage}</span>}
                    </label>
                </fieldset>

                {/* Email */}
                <div className="form-group">
                    <label>
                        Email <span className="required">*</span>
                    </label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="example@email.com"
                        className={errors.email ? "error" : ""}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                {/* Phone */}
                <div className="form-group">
                    <label>
                        Số điện thoại <span className="required">*</span>
                    </label>
                    <input
                        type="tel"
                        value={form.phoneNumber}
                        onChange={(e) => handleChange("phoneNumber", e.target.value)}
                        placeholder="0987654321"
                        className={errors.phoneNumber ? "error" : ""}
                    />
                    {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                </div>

                {/* Địa chỉ */}
                <fieldset className="address-section">
                    <legend>Địa chỉ thường trú</legend>

                    <label>
                        Tỉnh/Thành phố <span className="required">*</span>
                        <input
                            type="text"
                            value={form.address.province}
                            onChange={(e) => handleAddressChange("province", e.target.value)}
                            className={errors.province ? "error" : ""}
                        />
                        {errors.province && <span className="error-message">{errors.province}</span>}
                    </label>

                    <label>
                        Quận/Huyện <span className="required">*</span>
                        <input
                            type="text"
                            value={form.address.district}
                            onChange={(e) => handleAddressChange("district", e.target.value)}
                            className={errors.district ? "error" : ""}
                        />
                        {errors.district && <span className="error-message">{errors.district}</span>}
                    </label>

                    <label>
                        Phường/Xã <span className="required">*</span>
                        <input
                            type="text"
                            value={form.address.ward}
                            onChange={(e) => handleAddressChange("ward", e.target.value)}
                            className={errors.ward ? "error" : ""}
                        />
                        {errors.ward && <span className="error-message">{errors.ward}</span>}
                    </label>

                    <label>
                        Số nhà, tên đường <span className="required">*</span>
                        <input
                            type="text"
                            value={form.address.street}
                            onChange={(e) => handleAddressChange("street", e.target.value)}
                            className={errors.street ? "error" : ""}
                        />
                        {errors.street && <span className="error-message">{errors.street}</span>}
                    </label>
                </fieldset>

                {/* Actions */}
                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate("/tax-form")}
                    >
                        Quay lại
                    </button>

                    <div>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={(e) => handleSubmit(e, "save")}
                        >
                            Lưu
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            onClick={(e) => handleSubmit(e, "next")}
                        >
                            Tiếp theo
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
