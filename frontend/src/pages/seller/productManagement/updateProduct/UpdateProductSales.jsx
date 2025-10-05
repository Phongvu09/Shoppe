import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../updateProduct/ProductContext.jsx";
import { useState, useEffect } from "react";
import SellerLayout from "../../../../components/SellerLayout.jsx";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar.jsx";
import { getProductById } from "../../../../api/product.js";
import "./UpdateProductSales.css";

export default function UpdateProductSales() {
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy productId từ route
    const { productData, setProductData } = useProduct();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProductById(id);
                const data = res.data; // giả sử API trả về object product
                setProductData({
                    ...productData,
                    category: data.category || "",
                    price: data.price || 0,
                    stock: data.stock || 0
                });
            } catch (err) {
                console.error("Lỗi khi fetch sản phẩm:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const validateForm = () => {
        const newErrors = {};
        if (!productData.category || productData.category.trim() === "")
            newErrors.category = "Vui lòng nhập phân loại hàng";
        if (!productData.price || Number(productData.price) <= 0)
            newErrors.price = "Giá bán phải lớn hơn 0";
        if (productData.stock === undefined || Number(productData.stock) < 0)
            newErrors.stock = "Số lượng kho không được nhỏ hơn 0";
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
        navigate("/seller/product/update/review/" + id);
    };

    if (loading) return <p>Đang tải...</p>;

    return (
        <SellerLayout>
            <ProgressBar />
            <div className="product-sales">
                <h2>Cập nhật thông tin bán hàng</h2>
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
                    <button onClick={() => navigate("/seller/product/update/detail/" + id)}>Quay lại</button>
                    <button onClick={handleNext}>Tiếp theo</button>
                </div>
            </div>
        </SellerLayout>
    );
}
