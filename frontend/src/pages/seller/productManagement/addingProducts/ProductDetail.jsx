import { useNavigate } from "react-router-dom";
import { useProduct } from "../addingProducts/ProductContext.jsx";

export default function ProductDetail() {
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
                    Màu sắc
                    <input type="text"
                        name=""
                        placeholder="Màu sắc"
                        value={productData.colors}
                        onChange={handleChange} />
                </label>

                <label>
                    Kích cỡ
                    <input type="text"
                        name=""
                        placeholder="Kích cỡ"
                        value={productData.colors}
                        onChange={handleChange} />
                </label>

                <label>
                    Nguồn gốc
                    <input type="text"
                        name=""
                        placeholder="Nguồn gốc"
                        value={productData.colors}
                        onChange={handleChange} />
                </label>

                <label>
                    Trọng lượng
                    <input type="text"
                        name=""
                        placeholder="Trọng lượng"
                        value={productData.colors}
                        onChange={handleChange} />
                </label>
            </div>
        </div>
    )

}