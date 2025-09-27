import { useNavigate } from "react-router-dom";
import { useProduct } from "../addingProducts/ProductContext.jsx";
import { useState } from "react";
import SellerLayout from "../../../../components/SellerLayout.jsx";
import "./ProductDetail.css";

export default function ProductDetail() {
    const navigate = useNavigate();
    const { productData, setProductData } = useProduct();
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!productData.colors || productData.colors.length === 0)
            newErrors.colors = "Vui lòng nhập ít nhất một màu sắc";
        if (!productData.sizes || productData.sizes.length === 0)
            newErrors.sizes = "Vui lòng nhập ít nhất một kích cỡ";
        if (!productData.origin) newErrors.origin = "Vui lòng nhập nguồn gốc";
        if (!productData.weight || productData.weight <= 0)
            newErrors.weight = "Vui lòng nhập cân nặng hợp lệ";
        return newErrors;
    };

    const handleNext = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        navigate("/seller/product/sales");
    };

    return (
        <SellerLayout>
            <div className="product-detail">
                <h2>Thông tin chi tiết</h2>

                <label>
                    Màu sắc (cách nhau dấu phẩy)
                    <input
                        type="text"
                        name="colors"
                        placeholder="Đỏ, Xanh, Vàng"
                        value={productData.colors.join(", ")}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                colors: e.target.value.split(",").map((c) => c.trim()),
                            })
                        }
                    />
                    {errors.colors && <p className="error">{errors.colors}</p>}
                </label>

                <label>
                    Kích cỡ (cách nhau dấu phẩy)
                    <input
                        type="text"
                        name="sizes"
                        placeholder="S, M, L"
                        value={productData.sizes.join(", ")}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                sizes: e.target.value.split(",").map((s) => s.trim()),
                            })
                        }
                    />
                    {errors.sizes && <p className="error">{errors.sizes}</p>}
                </label>

                <label>
                    Nguồn gốc
                    <input
                        type="text"
                        name="origin"
                        value={productData.origin}
                        onChange={(e) =>
                            setProductData({ ...productData, origin: e.target.value })
                        }
                    />
                    {errors.origin && <p className="error">{errors.origin}</p>}
                </label>

                <label>
                    Trọng lượng (gram)
                    <input
                        type="number"
                        name="weight"
                        value={productData.weight}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                weight: Number(e.target.value),
                            })
                        }
                    />
                    {errors.weight && <p className="error">{errors.weight}</p>}
                </label>

                <div className="buttons">
                    <button onClick={() => navigate("/seller/product/info")}>Quay lại</button>
                    <button onClick={handleNext}>Tiếp theo</button>
                </div>
            </div>
        </SellerLayout>
    );
}
