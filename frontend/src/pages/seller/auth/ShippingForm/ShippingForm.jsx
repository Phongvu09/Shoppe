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
    const shopId = localStorage.getItem("shopId");

    const [groups, setGroups] = useState(
        SHIPPING_GROUPS.map((g) => ({
            ...g,
            isOpen: true,
            methodsState: g.methods.map((m) => ({ name: m, isActive: true, codEnabled: true }))
        }))
    );

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const toggleMethod = (gIdx, mIdx, field) => {
        setGroups((prev) => {
            const updated = [...prev];
            const method = updated[gIdx].methodsState[mIdx];
            method[field] = !method[field];
            if (field === "isActive" && !method.isActive) method.codEnabled = false;
            return updated;
        });
    };

    const toggleAccordion = (idx) => {
        setGroups((prev) => {
            const updated = [...prev];
            updated[idx].isOpen = !updated[idx].isOpen;
            return updated;
        });
    };

    const validateForm = () => {
        const newErrors = {};
        const hasActive = groups.some((g) => g.methodsState.some((m) => m.isActive));
        if (!hasActive) newErrors.methods = "Vui lòng bật ít nhất một phương thức vận chuyển";
        return newErrors;
    };

    const handleSave = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (!shopId) {
            alert("Chưa có shopId, vui lòng tạo shop trước.");
            return;
        }

        const payload = {
            shopId,
            methods: groups.flatMap((g) =>
                g.methodsState.map((m) => ({
                    name: g.key,
                    isActive: m.isActive,
                    codEnabled: m.isActive ? m.codEnabled : false
                }))
            )
        };

        try {
            setLoading(true);
            const response = await createShippingInformation(payload);
            console.log("✅ Shipping information saved:", response);

            if (response?.shipping?._id) {
                localStorage.setItem("shippingId", response.shipping._id);
            }

            alert("Lưu thành công!");
        } catch (error) {
            console.error("❌ Error saving shipping information:", error);
            alert(error.message || "Không thể lưu thông tin vận chuyển");
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        navigate("/seller/tax-form");
    };

    return (
        <form className="shipping-form" onSubmit={(e) => e.preventDefault()}>
            <h2>Cấu hình Vận chuyển</h2>

            {groups.map((group, gIdx) => (
                <div className="accordion" key={group.key}>
                    <div className="accordion-header" onClick={() => toggleAccordion(gIdx)}>
                        {group.title} <span>{group.isOpen ? "▾" : "▸"}</span>
                    </div>

                    {group.isOpen && (
                        <div className="accordion-body">
                            {group.methodsState.map((method, mIdx) => (
                                <label className="method-row" key={method.name}>
                                    <span>{method.name}</span>
                                    <input
                                        type="checkbox"
                                        checked={method.isActive}
                                        onChange={() => toggleMethod(gIdx, mIdx, "isActive")}
                                    />
                                    {method.isActive && (
                                        <span className="cod-status">[COD đã được kích hoạt]</span>
                                    )}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {errors.methods && <p className="error-text">{errors.methods}</p>}

            <div className="form-actions">
                <button type="button" onClick={() => navigate("/shop-info")} disabled={loading}>
                    Quay lại
                </button>
                <button type="button" onClick={handleSave} disabled={loading}>
                    {loading ? "Đang lưu..." : "Lưu"}
                </button>
                <button type="button" onClick={handleNext}>
                    Tiếp theo
                </button>
            </div>
        </form>
    );
}
