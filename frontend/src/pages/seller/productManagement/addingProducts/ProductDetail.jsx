import { useNavigate } from "react-router-dom";
import { useProduct } from "../addingProducts/ProductContext.jsx";
import "./ProductDetail.css";

export default function ProductDetail() {
    const navigate = useNavigate();
    const { productData, setProductData } = useProduct();

    return (
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
            </label>

            <label>
                Trọng lượng (gram)
                <input
                    type="number"
                    name="weight"
                    value={productData.weight}
                    onChange={(e) =>
                        setProductData({ ...productData, weight: e.target.value })
                    }
                />
            </label>

            <div className="buttons">
                <button onClick={() => navigate("/product/info")}>Quay lại</button>
                <button onClick={() => navigate("/product/sales")}>Tiếp theo</button>
            </div>
        </div>
    );
}
