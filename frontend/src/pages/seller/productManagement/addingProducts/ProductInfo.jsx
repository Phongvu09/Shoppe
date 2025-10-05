import { useNavigate } from "react-router-dom";
import { useProduct } from "../addingProducts/ProductContext.jsx";
import { useState } from "react";
import SellerLayout from "../../../../components/SellerLayout.jsx";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar.jsx"; // Thêm ProgressBar
import "./ProductInfo.css";

export default function ProductInfo() {
    const navigate = useNavigate();
    const { productData, setProductData } = useProduct();
    const [error, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!productData.images || productData.images.length === 0)
            newErrors.images = "Vui lòng chọn ít nhất 1 ảnh";
        if (!productData.name || productData.name.length < 5)
            newErrors.name = "Tên sản phẩm có ít nhất 5 chữ";
        if (!productData.description || productData.description.length < 20)
            newErrors.description = "Mô tả sản phẩm ít nhất 20 chữ";
        return newErrors;
    };

    const handleNext = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        navigate("/seller/product/detail");
    };

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setProductData({ ...productData, images: files });
    };

    return (
        <SellerLayout>
            <ProgressBar /> {/* Thêm thanh tiến trình */}
            <div className="product-info">
                <h2>Thông tin cơ bản</h2>
                <label>
                    Ảnh sản phẩm
                    <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                    {error.images && <p className="error">{error.images}</p>}
                </label>
                <label>
                    Tên sản phẩm
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                    />
                    {error.name && <p className="error">{error.name}</p>}
                </label>
                <label>
                    Mô tả sản phẩm
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                    />
                    {error.description && <p className="error">{error.description}</p>}
                </label>
                <button onClick={handleNext}>Tiếp theo</button>
            </div>
        </SellerLayout>
    );
}