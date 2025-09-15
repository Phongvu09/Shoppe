import { useNavigate } from "react-router-dom";
import { useProduct } from "../addingProducts/ProductContext.jsx";
import { set } from "mongoose";

export default function ProductInfo() {
    const navigate = useNavigate();
    const { productData, setProductData } = useProduct();

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Thông tin cơ bản</h2>
            <div>

                <label >
                    ảnh gốc
                    <input
                        type="file"
                        accept="image/*"
                        name="origin"
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Tên sản phẩm
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                    />
                </label>

                <label >
                    Mô tả sản phẩm
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                    />
                </label>
                <button onClick={() => navigate("/")}>Tiếp theo</button>
            </div>
        </div>
    )
}