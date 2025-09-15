import { useNavigate } from "react-router-dom";
import { useProduct } from "../addingProducts/ProductContext.jsx";

export default function ProductSales() {
    const navigate = useNavigate();
    const { productData, setProductData } = useProduct();

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <h2>Thông tin sản phẩm</h2>
            <div>
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

                <button onClick={() => navigate(-1)}>Quay lại</button>
                <button onClick={() => navigate("/")}>Hoàn tất</button>
            </div>
        </div>
    )
}