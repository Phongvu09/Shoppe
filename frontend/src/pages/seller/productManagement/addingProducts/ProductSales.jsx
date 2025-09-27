import { useNavigate } from "react-router-dom";
import { useProduct } from "../addingProducts/ProductContext.jsx";
import { useState } from "react";
import SellerLayout from "../../../../components/SellerLayout.jsx";
import "./ProductSales.css";

export default function ProductSales() {
    const navigate = useNavigate();
    const { productData, setProductData } = useProduct();
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!productData.category || productData.category.trim() === "") {
            newErrors.category = "Vui lòng nhập phân loại hàng";
        }
        if (!productData.price || Number(productData.price) <= 0) {
            newErrors.price = "Giá bán phải lớn hơn 0";
        }
        if (productData.stock === undefined || Number(productData.stock) < 0) {
            newErrors.stock = "Số lượng kho không được nhỏ hơn 0";
        }
        return newErrors;
    };

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        navigate("/seller/product/review");
    };

    return (
        <SellerLayout>
            <div className="product-sales">
                <h2>Thông tin bán hàng</h2>

                <label>
                    Phân loại hàng
                    <input
                        type="text"
                        name="category"
                        value={productData.category || ""}
                        onChange={handleChange}
                    />
                    {errors.category && <p className="error">{errors.category}</p>}
                </label>

                <label>
                    Giá bán
                    <input
                        type="number"
                        name="price"
                        value={productData.price || ""}
                        onChange={handleChange}
                    />
                    {errors.price && <p className="error">{errors.price}</p>}
                </label>

                <label>
                    Số lượng kho
                    <input
                        type="number"
                        name="stock"
                        value={productData.stock || ""}
                        onChange={handleChange}
                    />
                    {errors.stock && <p className="error">{errors.stock}</p>}
                </label>

                <div className="buttons">
                    <button onClick={() => navigate("/seller/product/detail")}>Quay lại</button>
                    <button onClick={handleNext}>Tiếp theo</button>
                </div>
            </div>
        </SellerLayout>
    );
}
