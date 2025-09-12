import { useState } from "react";
import "./ShippingForm.css";
import { createShippingInformation } from "../../../../api/shipping.js";

const SHIPPING_METHODS = [
    { value: "express", label: "Giao hàng nhanh" },
    { value: "fast", label: "Giao hàng tiết kiệm" },
    { value: "pickup", label: "Người mua tự đến lấy" },
    { value: "bulky", label: "Hàng cồng kềnh" }
];

const ShippingForm = ({ onBack }) => {
    const [methods, setMethods] = useState(
        SHIPPING_METHODS.map(m => ({
            name: m.value,
            isActive: false,
            codEnabled: false,
            weightLimit: ""
        }))
    );
    const [errors, setErrors] = useState("");

    const handleChange = (index, field, value) => {
        const updated = [...methods];
        updated[index][field] = value;
        setMethods(updated);
    };

    const validateForm = () => {
        const hasActive = methods.some(m => m.isActive);
        if (!hasActive) {
            setErrors("Bạn phải bật ít nhất 1 phương thức vận chuyển.");
            return false;
        }
        setErrors("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const res = await createShippingInformation({ methods });
            console.log("Shipping info saved:", res.data);
            // TODO: chuyển bước tiếp theo
        } catch (err) {
            console.error("Error saving shipping info:", err);
        }
    };

    return (
        <div className="shipping-container">
            <h2>Cấu hình vận chuyển</h2>
            <form onSubmit={handleSubmit} className="shipping-form">
                {methods.map((method, idx) => (
                    <div key={method.name} className="shipping-method">
                        <h3>{SHIPPING_METHODS.find(m => m.value === method.name).label}</h3>

                        <div className="form-group">
                            <label>Bật phương thức</label>
                            <input
                                type="checkbox"
                                checked={method.isActive}
                                onChange={e => handleChange(idx, "isActive", e.target.checked)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Hỗ trợ COD</label>
                            <input
                                type="checkbox"
                                checked={method.codEnabled}
                                disabled={!method.isActive}
                                onChange={e => handleChange(idx, "codEnabled", e.target.checked)}
                            />
                        </div>

                        {method.name === "pickup" && method.isActive && (
                            <div className="form-group">
                                <label>Giới hạn khối lượng (kg)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={method.weightLimit}
                                    onChange={e => handleChange(idx, "weightLimit", e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                ))}

                {errors && <p className="error-text">{errors}</p>}

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-back"
                        onClick={onBack}
                    >
                        Quay lại
                    </button>
                    <div className="right-buttons">
                        <button type="button" className="btn-secondary">
                            Lưu
                        </button>
                        <button type="submit" className="btn-primary">
                            Tiếp theo
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ShippingForm;
