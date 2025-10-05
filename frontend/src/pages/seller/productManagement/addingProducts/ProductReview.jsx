import { useNavigate } from "react-router-dom";
import { useProduct } from "./ProductContext";
import { createProduct } from "../../../../api/product.js";
import SellerLayout from "../../../../components/SellerLayout.jsx";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar.jsx"; // Thêm ProgressBar
import "./ProductReview.css";

export default function ProductReview() {
    const { productData } = useProduct();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            console.log("Product data being sent:", productData);
            const res = await createProduct(productData);
            console.log("Product created response:", res);
            navigate("/seller/products/list");
        } catch (error) {
            console.error("Error creating product chi tiết:", {
                message: error.message,
                status: error.status,
                data: error.data,
            });
        }
    };

    return (
        <SellerLayout>
            <ProgressBar /> {/* Thêm thanh tiến trình */}
            <div className="product-review">
                <h2>Xem lại sản phẩm</h2>
                <section>
                    <h3>Ảnh sản phẩm</h3>
                    <div className="image-preview">
                        {productData.images &&
                            productData.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={typeof img === "string" ? img : URL.createObjectURL(img)}
                                    alt={`preview-${i}`}
                                    width="100"
                                />
                            ))}
                    </div>
                </section>
                <section>
                    <h3>Thông tin cơ bản</h3>
                    <p><b>Tên:</b> {productData.name}</p>
                    <p><b>Mô tả:</b> {productData.description}</p>
                </section>
                <section>
                    <h3>Thông tin chi tiết</h3>
                    <p><b>Màu sắc:</b> {(productData.colors || []).join(", ")}</p>
                    <p><b>Kích cỡ:</b> {(productData.sizes || []).join(", ")}</p>
                    <p><b>Nguồn gốc:</b> {productData.origin}</p>
                    <p><b>Trọng lượng:</b> {productData.weight} gram</p>
                </section>
                <section>
                    <h3>Thông tin bán hàng</h3>
                    <p><b>Phân loại:</b> {productData.category}</p>
                    <p><b>Giá bán:</b> {productData.price} đ</p>
                    <p><b>Tồn kho:</b> {productData.stock}</p>
                </section>
                <div className="buttons">
                    <button onClick={() => navigate("/seller/product/sales")}>Quay lại</button>
                    <button onClick={handleSubmit}>Hoàn tất</button>
                </div>
            </div>
        </SellerLayout>
    );
}