import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../updateProduct/ProductContext.jsx";
import { useEffect, useState } from "react";
import { getProductById } from "../../../../api/product.js";
import SellerLayout from "../../../../components/SellerLayout.jsx";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar.jsx";
import "./UpdateProductDetail.css"; // dùng chung với adding

export default function UpdateProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { productData, setProductData } = useProduct();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProductById(id);
                const data = res.data;
                setProductData({
                    ...productData,
                    colors: Array.isArray(data.colors) ? data.colors.map(c => c.trim()) : [],
                    sizes: Array.isArray(data.sizes) ? data.sizes.map(s => s.trim()) : [],
                    origin: data.origin || "",
                    weight: data.weight || 0,
                });

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <p>Đang tải...</p>;

    const handleNext = () => {
        const newErrors = {};
        if (!productData.colors || productData.colors.length === 0)
            newErrors.colors = "Vui lòng nhập ít nhất một màu sắc";
        if (!productData.sizes || productData.sizes.length === 0)
            newErrors.sizes = "Vui lòng nhập ít nhất một kích cỡ";
        if (!productData.origin) newErrors.origin = "Vui lòng nhập nguồn gốc";
        if (!productData.weight || productData.weight <= 0)
            newErrors.weight = "Vui lòng nhập cân nặng hợp lệ";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        navigate("/seller/product/update/sales/" + id);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "colors" || name === "sizes") {
            setProductData({ ...productData, [name]: value.split(",").map(v => v.trim()) });
        } else if (name === "weight") {
            setProductData({ ...productData, weight: Number(value) });
        } else {
            setProductData({ ...productData, [name]: value });
        }
    };

    return (
        <SellerLayout>
            <ProgressBar />
            <div className="product-detail">
                <h2>Cập nhật chi tiết sản phẩm</h2>

                <label>
                    Màu sắc (cách nhau dấu phẩy)
                    <input
                        type="text"
                        name="colors"
                        placeholder="Đỏ, Xanh, Vàng"
                        value={productData.colors.join(", ")}
                        onChange={handleChange}
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
                        onChange={handleChange}
                    />
                    {errors.sizes && <p className="error">{errors.sizes}</p>}
                </label>

                <label>
                    Nguồn gốc
                    <input
                        type="text"
                        name="origin"
                        value={productData.origin}
                        onChange={handleChange}
                    />
                    {errors.origin && <p className="error">{errors.origin}</p>}
                </label>

                <label>
                    Trọng lượng (gram)
                    <input
                        type="number"
                        name="weight"
                        value={productData.weight}
                        onChange={handleChange}
                    />
                    {errors.weight && <p className="error">{errors.weight}</p>}
                </label>

                <div className="buttons">
                    <button onClick={() => navigate("/seller/product/update/info/" + id)}>Quay lại</button>
                    <button onClick={handleNext}>Tiếp theo</button>
                </div>
            </div>
        </SellerLayout>
    );
}
