import { useState } from "react";
import "./IdentityForm.css";

export default function IdentityForm({ onSubmit }) {
    const [form, setForm] = useState({
        ownerType: "individual",
        personalInfo: {
            fullName: "",
            idType: "CCCD",
            idNumber: "",
            issuedDate: "",
            issuedPlace: "",
            frontImage: "",
            backImage: ""
        },
        businessInfo: {
            companyName: "",
            businessLicenseNumber: "",
            issuedDate: "",
            issuedPlace: "",
            licenseImage: ""
        }
    });

    const handleChange = (section, field, value) => {
        setForm({
            ...form,
            [section]: {
                ...form[section],
                [field]: value
            }
        });
    };

    const handleOwnerTypeChange = (value) => {
        setForm({ ...form, ownerType: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form className="identity-form" onSubmit={handleSubmit}>
            <h2>Thông tin Định danh</h2>

            <label>
                Loại chủ sở hữu:
                <select
                    value={form.ownerType}
                    onChange={(e) => handleOwnerTypeChange(e.target.value)}
                >
                    <option value="individual">Cá nhân</option>
                    <option value="business">Doanh nghiệp</option>
                </select>
            </label>

            {form.ownerType === "individual" && (
                <div className="section">
                    <label>
                        Họ và tên:
                        <input
                            type="text"
                            value={form.personalInfo.fullName}
                            onChange={(e) =>
                                handleChange("personalInfo", "fullName", e.target.value)
                            }
                            required
                        />
                    </label>

                    <label>
                        Loại giấy tờ:
                        <select
                            value={form.personalInfo.idType}
                            onChange={(e) =>
                                handleChange("personalInfo", "idType", e.target.value)
                            }
                        >
                            <option value="CCCD">CCCD</option>
                            <option value="CMND">CMND</option>
                            <option value="Passport">Passport</option>
                        </select>
                    </label>

                    <label>
                        Số giấy tờ:
                        <input
                            type="text"
                            value={form.personalInfo.idNumber}
                            onChange={(e) =>
                                handleChange("personalInfo", "idNumber", e.target.value)
                            }
                            required
                        />
                    </label>

                    <label>
                        Ngày cấp:
                        <input
                            type="date"
                            value={form.personalInfo.issuedDate}
                            onChange={(e) =>
                                handleChange("personalInfo", "issuedDate", e.target.value)
                            }
                        />
                    </label>

                    <label>
                        Nơi cấp:
                        <input
                            type="text"
                            value={form.personalInfo.issuedPlace}
                            onChange={(e) =>
                                handleChange("personalInfo", "issuedPlace", e.target.value)
                            }
                        />
                    </label>

                    <label>
                        Ảnh mặt trước:
                        <input
                            type="text"
                            placeholder="URL ảnh (Cloudinary)"
                            value={form.personalInfo.frontImage}
                            onChange={(e) =>
                                handleChange("personalInfo", "frontImage", e.target.value)
                            }
                        />
                    </label>

                    <label>
                        Ảnh mặt sau:
                        <input
                            type="text"
                            placeholder="URL ảnh (Cloudinary)"
                            value={form.personalInfo.backImage}
                            onChange={(e) =>
                                handleChange("personalInfo", "backImage", e.target.value)
                            }
                        />
                    </label>
                </div>
            )}

            {form.ownerType === "business" && (
                <div className="section">
                    <label>
                        Tên công ty:
                        <input
                            type="text"
                            value={form.businessInfo.companyName}
                            onChange={(e) =>
                                handleChange("businessInfo", "companyName", e.target.value)
                            }
                            required
                        />
                    </label>

                    <label>
                        Số GPKD:
                        <input
                            type="text"
                            value={form.businessInfo.businessLicenseNumber}
                            onChange={(e) =>
                                handleChange("businessInfo", "businessLicenseNumber", e.target.value)
                            }
                            required
                        />
                    </label>

                    <label>
                        Ngày cấp:
                        <input
                            type="date"
                            value={form.businessInfo.issuedDate}
                            onChange={(e) =>
                                handleChange("businessInfo", "issuedDate", e.target.value)
                            }
                        />
                    </label>

                    <label>
                        Nơi cấp:
                        <input
                            type="text"
                            value={form.businessInfo.issuedPlace}
                            onChange={(e) =>
                                handleChange("businessInfo", "issuedPlace", e.target.value)
                            }
                        />
                    </label>

                    <label>
                        Ảnh giấy phép kinh doanh:
                        <input
                            type="text"
                            placeholder="URL ảnh (Cloudinary)"
                            value={form.businessInfo.licenseImage}
                            onChange={(e) =>
                                handleChange("businessInfo", "licenseImage", e.target.value)
                            }
                        />
                    </label>
                </div>
            )}

            <button type="submit" className="btn-save">
                Lưu thông tin
            </button>
        </form>
    );
}
