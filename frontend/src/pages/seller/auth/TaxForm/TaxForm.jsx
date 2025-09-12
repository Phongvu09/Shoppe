import { useState } from "react";
import "./TaxForm.css";

export default function TaxForm({ onSubmit }) {
    const [form, setForm] = useState({
        businessType: "Individual",
        companyName: "",
        businessRegistrationAddress: {
            country: "Việt Nam",
            province: "",
            district: "",
            ward: "",
            commune: ""
        },
        taxCode: "",
        email: ""
    });

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleAddressChange = (field, value) => {
        setForm({
            ...form,
            businessRegistrationAddress: {
                ...form.businessRegistrationAddress,
                [field]: value
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form className="tax-form" onSubmit={handleSubmit}>
            <h2>Thông tin Thuế</h2>

            <label>
                Loại hình kinh doanh:
                <select
                    value={form.businessType}
                    onChange={(e) => handleChange("businessType", e.target.value)}
                >
                    <option value="Individual">Cá nhân</option>
                    <option value="Housldhold Bussiness">Hộ kinh doanh</option>
                    <option value="Company">Công ty</option>
                </select>
            </label>

            {form.businessType === "Company" && (
                <label>
                    Tên công ty:
                    <input
                        type="text"
                        value={form.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        required
                    />
                </label>
            )}

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
                        required
                    />
                </label>

                <label>
                    Quận/Huyện:
                    <input
                        type="text"
                        value={form.businessRegistrationAddress.district}
                        onChange={(e) => handleAddressChange("district", e.target.value)}
                        required
                    />
                </label>

                <label>
                    Phường/Xã:
                    <input
                        type="text"
                        value={form.businessRegistrationAddress.ward}
                        onChange={(e) => handleAddressChange("ward", e.target.value)}
                        required
                    />
                </label>

                <label>
                    Thôn/Ấp (nếu có):
                    <input
                        type="text"
                        value={form.businessRegistrationAddress.commune}
                        onChange={(e) => handleAddressChange("commune", e.target.value)}
                    />
                </label>
            </fieldset>

            <label>
                Mã số thuế:
                <input
                    type="text"
                    value={form.taxCode}
                    onChange={(e) => handleChange("taxCode", e.target.value)}
                    required
                />
            </label>

            <label>
                Email nhận hóa đơn điện tử:
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                />
            </label>

            <button type="submit" className="btn-save">
                Lưu thông tin
            </button>
        </form>
    );
}
