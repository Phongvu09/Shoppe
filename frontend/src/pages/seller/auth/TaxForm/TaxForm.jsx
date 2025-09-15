import { useState } from "react";
import "./TaxForm.css";
import { createTax } from "../../../../api/tax.js";
import { useNavigate } from "react-router-dom";

const shopId = localStorage.getItem("shopId");
export default function TaxForm() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        businessType: "Individual",
        fullName: "",
        personalAddress: "",
        companyName: "",
        businessRegistrationAddress: {
            country: "Việt Nam",
            province: "",
            district: "",
            ward: "",
            commune: ""
        },
        businessLicense: null,
        taxCode: "",
        email: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
        setErrors({ ...errors, [field]: "" });
    };

    const handleAddressChange = (field, value) => {
        setForm({
            ...form,
            businessRegistrationAddress: {
                ...form.businessRegistrationAddress,
                [field]: value
            }
        });
        setErrors({ ...errors, [field]: "" });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, businessLicense: file });
        setErrors({ ...errors, businessLicense: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        if (form.businessType === "Individual") {
            if (!form.fullName) newErrors.fullName = "Vui lòng nhập họ và tên";
            if (!form.personalAddress) newErrors.personalAddress = "Vui lòng nhập địa chỉ";
        } else {
            if (!form.companyName) newErrors.companyName = "Vui lòng nhập tên công ty / hộ kinh doanh";
            if (!form.businessRegistrationAddress.province) newErrors.province = "Vui lòng nhập tỉnh/thành phố";
            if (!form.businessRegistrationAddress.district) newErrors.district = "Vui lòng nhập quận/huyện";
            if (!form.businessRegistrationAddress.ward) newErrors.ward = "Vui lòng nhập phường/xã";
            if (!form.businessLicense) newErrors.businessLicense = "Vui lòng upload giấy phép kinh doanh";
        }
        if (!form.taxCode) newErrors.taxCode = "Vui lòng nhập mã số thuế";
        if (!form.email) newErrors.email = "Vui lòng nhập email";
        return newErrors;
    };

    const handleSubmit = (e, action = "next") => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Tạo payload
        const payload = {
            shopId: shopId,
            businessType: form.businessType,
            taxCode: form.taxCode,
            email: form.email

        }
        Object.keys(form).forEach((key) => {
            if (key === "businessRegistrationAddress") {
                payload[key] = JSON.stringify(form[key]);
            } else {
                payload[key] = form[key];
            }
        });

        createTax(payload)
            .then((response) => {
                console.log("Tax information saved:", response.data);
                if (action === "next") {
                    navigate("/identity-form");
                } else if (action === "save") {

                    console.log("Thông tin đã được lưu tạm thời.");
                } else {
                    console.log("Unknown action:", action);
                }
            })
            .catch((error) => {
                console.error("Error saving tax information:", error);
            });
    };

    return (
        <form className="tax-form">
            <h2>Thông tin Thuế</h2>

            {/* Loại hình kinh doanh */}
            <label>
                Loại hình kinh doanh:
                <select
                    value={form.businessType}
                    onChange={(e) => handleChange("businessType", e.target.value)}
                >
                    <option value="Individual">Cá nhân</option>
                    <option value="HouseholdBusiness">Hộ kinh doanh</option>
                    <option value="Company">Công ty</option>
                </select>
            </label>

            {/* Cá nhân */}
            {form.businessType === "Individual" && (
                <>
                    <label>
                        Họ và tên:
                        <input
                            type="text"
                            value={form.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                            className={errors.fullName ? "error" : ""}
                            placeholder={errors.fullName || "Nguyễn Văn A"}
                        />
                        {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                    </label>

                    <label>
                        Địa chỉ:
                        <input
                            type="text"
                            value={form.personalAddress}
                            onChange={(e) => handleChange("personalAddress", e.target.value)}
                            className={errors.personalAddress ? "error" : ""}
                            placeholder={errors.personalAddress || "123 Trường Chinh, Hà Nội"}
                        />
                        {errors.personalAddress && <span className="error-text">{errors.personalAddress}</span>}
                    </label>
                </>
            )}

            {/* Hộ kinh doanh & Công ty */}
            {(form.businessType === "HouseholdBusiness" || form.businessType === "Company") && (
                <>
                    <label>
                        Tên công ty / Hộ kinh doanh:
                        <input
                            type="text"
                            value={form.companyName}
                            onChange={(e) => handleChange("companyName", e.target.value)}
                            className={errors.companyName ? "error" : ""}
                            placeholder={errors.companyName || "Công ty TNHH ABC"}
                        />
                        {errors.companyName && <span className="error-text">{errors.companyName}</span>}
                    </label>

                    <fieldset className="address-section">
                        <legend>Địa chỉ đăng ký kinh doanh</legend>

                        <label>
                            Quốc gia:
                            <input type="text" value="Việt Nam" disabled />
                        </label>

                        <label>
                            Tỉnh/Thành phố:
                            <input
                                type="text"
                                value={form.businessRegistrationAddress.province}
                                onChange={(e) => handleAddressChange("province", e.target.value)}
                                className={errors.province ? "error" : ""}
                                placeholder={errors.province || "TP. Hồ Chí Minh"}
                            />
                            {errors.province && <span className="error-text">{errors.province}</span>}
                        </label>

                        <label>
                            Quận/Huyện:
                            <input
                                type="text"
                                value={form.businessRegistrationAddress.district}
                                onChange={(e) => handleAddressChange("district", e.target.value)}
                                className={errors.district ? "error" : ""}
                                placeholder={errors.district || "Quận 1"}
                            />
                            {errors.district && <span className="error-text">{errors.district}</span>}
                        </label>

                        <label>
                            Phường/Xã:
                            <input
                                type="text"
                                value={form.businessRegistrationAddress.ward}
                                onChange={(e) => handleAddressChange("ward", e.target.value)}
                                className={errors.ward ? "error" : ""}
                                placeholder={errors.ward || "Phường Bến Nghé"}
                            />
                            {errors.ward && <span className="error-text">{errors.ward}</span>}
                        </label>

                        <label>
                            Thôn/Ấp (nếu có):
                            <input
                                type="text"
                                value={form.businessRegistrationAddress.commune}
                                onChange={(e) => handleAddressChange("commune", e.target.value)}
                                placeholder="Ấp 1 (không bắt buộc)"
                            />
                        </label>
                    </fieldset>

                    <label>
                        Giấy phép kinh doanh:
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className={errors.businessLicense ? "error" : ""}
                        />
                        {errors.businessLicense && (
                            <span className="error-text">{errors.businessLicense}</span>
                        )}
                    </label>
                </>
            )}

            {/* Chung */}
            <label>
                Mã số thuế:
                <input
                    type="text"
                    value={form.taxCode}
                    onChange={(e) => handleChange("taxCode", e.target.value)}
                    className={errors.taxCode ? "error" : ""}
                    placeholder={errors.taxCode || "Nhập mã số thuế"}
                />
                {errors.taxCode && <span className="error-text">{errors.taxCode}</span>}
            </label>

            <label>
                Email nhận hóa đơn điện tử:
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={errors.email ? "error" : ""}
                    placeholder={errors.email || "example@email.com"}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
            </label>

            {/* Nút hành động */}
            <div className="form-actions">
                {/* Quay lại nằm bên trái */}
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => navigate("/shipping-form")}
                >
                    Quay lại
                </button>


                {/* Gom Lưu + Tiếp theo về bên phải */}
                <div className="right-buttons">
                    <button
                        type="button"
                        className="btn-save"
                        onClick={(e) => handleSubmit(e, "save")}
                    >
                        Lưu
                    </button>
                    <button type="submit" className="btn-next" onClick={(e) => handleSubmit(e, "next")}>
                        Tiếp theo
                    </button>
                </div>
            </div>

        </form>
    );
}
