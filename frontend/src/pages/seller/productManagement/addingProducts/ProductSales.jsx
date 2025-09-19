import { useNavigate } from "react-router-dom";
import { useProduct } from "../addingProducts/ProductContext.jsx";
import "./ProductSales.css";

export default function ProductSales() {
    const navigate = useNavigate();
    const { productData, setProductData } = useProduct();

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    return (
        <div className="product-sales">
            <h2>Thông tin bán hàng</h2>

            <label>
                Phân loại hàng
                <input
                    type="text"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                />
            </label>

            <label>
                Giá bán
                <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                />
            </label>

            <label>
                Số lượng kho
                <input
                    type="number"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                />
            </label>

            <div className="buttons">
                <button onClick={() => navigate("/product/detail")}>Quay lại</button>
                <button onClick={() => navigate("/product/review")}>Tiếp theo</button>
            </div>
        </div>
    );
}
