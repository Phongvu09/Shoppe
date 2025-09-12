import { useState } from "react";
import "./ShippingForm.css";
import { createShippingInformation } from "../../../../api/shipping.js";
import { useNavigate } from "react-router-dom";

const SHIPPING_GROUPS = [
    { key: "express", title: "Siêu Tốc - Hỏa tốc", methods: ["Hỏa Tốc - Trong Ngày", "Siêu Tốc - 4 Giờ"] },
    { key: "fast", title: "Nhanh", methods: ["Nhanh"] },
    { key: "pickup", title: "Tủ Nhận Hàng", methods: ["Tủ Nhận Hàng"] },
    { key: "bulky", title: "Hàng Cồng Kềnh", methods: ["Hàng Cồng Kềnh"] }
];

export default function ShippingForm() {
    const navigate = useNavigate();

    const [groups, setGroups] = useState(
        SHIPPING_GROUPS.map((g) => ({
            ...g,
            isOpen: true,
            methodsState: g.methods.map((m) => ({
                name: m,
                isActive: true,
                codEnabled: true
            }))
        }))
    );

    const [errors, setErrors] = useState({});

    const toggleMethod = (groupIdx, methodIdx, field) => {
        const updated = [...groups];
        updated[groupIdx].methodsState[methodIdx][field] =
            !updated[groupIdx].methodsState[methodIdx][field];
        setGroups(updated);
    };

    const toggleAccordion = (idx) => {
        const updated = [...groups];
        updated[idx].isOpen = !updated[idx].isOpen;
        setGroups(updated);
    };

    const validateForm = () => {
        const newErrors = {};
        let hasActiveMethod = groups.some((g) =>
            g.methodsState.some((m) => m.isActive)
        );
        if (!hasActiveMethod) {
            newErrors.methods = "Vui lòng bật ít nhất một phương thức vận chuyển";
        }
        return newErrors;
    };

    const handleSubmit = (e, action = "next") => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const payload = groups.map((group) => ({
            group: group.key,
            methods: group.methodsState.map((m) => ({
                name: m.name,
                isActive: m.isActive,
                codEnabled: m.codEnabled
            }))
        }));

        createShippingInformation(payload)
            .then((response) => {
                console.log("Shipping information saved:", response.data);
                if (action === "next") {
                    navigate("/tax-form");
                } else if (action === "save") {
                    console.log("Thông tin đã được lưu tạm thời.");
                }
            })
            .catch((error) => {
                console.error("Error saving shipping information:", error);
            });
    };

    return (
        <form className="shipping-form">
            <h2>Cấu hình Vận chuyển</h2>

            {groups.map((group, gIdx) => (
                <div className="accordion" key={group.key}>
                    <div
                        className="accordion-header"
                        onClick={() => toggleAccordion(gIdx)}
                    >
                        {group.title}
                        <span>{group.isOpen ? "▾" : "▸"}</span>
                    </div>
                    {group.isOpen && (
                        <div className="accordion-body">
                            {group.methodsState.map((method, mIdx) => (
                                <label className="method-row" key={method.name}>
                                    <span className="method-label">{method.name}</span>
                                    <label className="switch-label switch">
                                        <input
                                            type="checkbox"
                                            checked={method.isActive}
                                            onChange={() =>
                                                toggleMethod(gIdx, mIdx, "isActive")
                                            }
                                        />
                                        <span className="slider"></span>
                                    </label>
                                    {method.isActive && (
                                        <span className="cod-label">
                                            [COD đã được kích hoạt]
                                        </span>
                                    )}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {errors.methods && (
                <p className="error-text">{errors.methods}</p>
            )}

            {/* Buttons */}
            <div className="form-actions">
                {/* Quay lại */}
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => navigate("/shop-info")}
                >
                    Quay lại
                </button>

                {/* Lưu + Tiếp theo */}
                <div className="right-buttons">
                    <button
                        type="button"
                        className="btn-save"
                        onClick={(e) => handleSubmit(e, "save")}
                    >
                        Lưu
                    </button>
                    <button
                        type="submit"
                        className="btn-next"
                        onClick={(e) => handleSubmit(e, "next")}
                    >
                        Tiếp theo
                    </button>
                </div>
            </div>
        </form>
    );
}
