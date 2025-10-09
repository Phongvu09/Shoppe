import { useState } from "react";
import "./TaxForm.css";
import { createTaxInformation } from "../../../../api/tax.js";
import { useNavigate } from "react-router-dom";

export default function TaxForm() {
    const navigate = useNavigate();
    const shopId = localStorage.getItem("shopId");

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
        businessLicense: "",
        taxCode: "",
        emailForReceivingEInvoices: ""
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

    const validateForm = () => {
        const newErrors = {};
        if (form.businessType === "Individual") {
            if (!form.fullName) newErrors.fullName = "Vui lòng nhập họ và tên";
            if (!form.personalAddress) newErrors.personalAddress = "Vui lòng nhập địa chỉ cá nhân";
        } else {
            if (!form.companyName) newErrors.companyName = "Vui lòng nhập tên công ty / hộ kinh doanh";
            if (!form.businessRegistrationAddress.province) newErrors.province = "Vui lòng nhập tỉnh/thành phố";
            if (!form.businessRegistrationAddress.district) newErrors.district = "Vui lòng nhập quận/huyện";
            if (!form.businessRegistrationAddress.ward) newErrors.ward = "Vui lòng nhập phường/xã";
            if (!form.businessLicense) newErrors.businessLicense = "Vui lòng nhập số giấy phép kinh doanh";
        }
        if (!form.taxCode) newErrors.taxCode = "Vui lòng nhập mã số thuế";
        if (!form.emailForReceivingEInvoices) newErrors.emailForReceivingEInvoices = "Vui lòng nhập email";
        return newErrors;
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const payload = { ...form, shopId };
            const response = await createTaxInformation(payload);
            console.log("✅ Tax information saved:", response);
            alert("Lưu thông tin thuế thành công!");
        } catch (error) {
            console.error("❌ Error saving tax information:", error);
            alert(error.message || "Không thể lưu thông tin thuế!");
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        navigate("/seller/identity-form");
    };

    return (
        <form className="tax-form">
            <h2>Thông tin Thuế</h2>

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

            {form.businessType === "Individual" && (
                <>
                    <label>
                        Họ và tên:
                        <input
                            type="text"
                            value={form.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                            className={errors.fullName ? "error" : ""}
                            placeholder="Nguyễn Văn A"
                        />
                        {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                    </label>

                    <label>
                        Địa chỉ cá nhân:
                        <input
                            type="text"
                            value={form.personalAddress}
                            onChange={(e) => handleChange("personalAddress", e.target.value)}
                            className={errors.personalAddress ? "error" : ""}
                            placeholder="123 Trường Chinh, Hà Nội"
                        />
                        {errors.personalAddress && <span className="error-text">{errors.personalAddress}</span>}
                    </label>
                </>
            )}

            {(form.businessType === "HouseholdBusiness" || form.businessType === "Company") && (
                <>
                    <label>
                        Tên công ty / hộ kinh doanh:
                        <input
                            type="text"
                            value={form.companyName}
                            onChange={(e) => handleChange("companyName", e.target.value)}
                            className={errors.companyName ? "error" : ""}
                            placeholder="Công ty TNHH ABC"
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
                                placeholder="TP. Hồ Chí Minh"
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
                                placeholder="Quận 1"
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
                                placeholder="Phường Bến Nghé"
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
                        Số giấy phép kinh doanh:
                        <input
                            type="text"
                            value={form.businessLicense}
                            onChange={(e) => handleChange("businessLicense", e.target.value)}
                            className={errors.businessLicense ? "error" : ""}
                            placeholder="0123456789"
                        />
                        {errors.businessLicense && <span className="error-text">{errors.businessLicense}</span>}
                    </label>
                </>
            )}

            <label>
                Mã số thuế:
                <input
                    type="text"
                    value={form.taxCode}
                    onChange={(e) => handleChange("taxCode", e.target.value)}
                    className={errors.taxCode ? "error" : ""}
                    placeholder="Nhập mã số thuế"
                />
                {errors.taxCode && <span className="error-text">{errors.taxCode}</span>}
            </label>

            <label>
                Email nhận hóa đơn điện tử:
                <input
                    type="email"
                    value={form.emailForReceivingEInvoices}
                    onChange={(e) => handleChange("emailForReceivingEInvoices", e.target.value)}
                    className={errors.emailForReceivingEInvoices ? "error" : ""}
                    placeholder="example@email.com"
                />
                {errors.emailForReceivingEInvoices && (
                    <span className="error-text">{errors.emailForReceivingEInvoices}</span>
                )}
            </label>

            <div className="form-actions">
                <button type="button" onClick={() => navigate("/shipping-form")} className="btn-secondary">
                    Quay lại
                </button>
                <div className="right-buttons">
                    <button type="button" onClick={handleSave} className="btn-save">
                        Lưu
                    </button>
                    <button type="button" onClick={handleNext} className="btn-next">
                        Tiếp theo
                    </button>
                </div>
            </div>
        </form>
    );
}
