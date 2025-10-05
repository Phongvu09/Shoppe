import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../updateProduct/ProductContext.jsx";
import { updateProduct } from "../../../../api/product.js"; // API update
import SellerLayout from "../../../../components/SellerLayout.jsx";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar.jsx";
import "./UpdateProductReview.css";

export default function UpdateProductReview() {
    const navigate = useNavigate();
    const { id } = useParams(); // id sản phẩm
    const { productData } = useProduct();

    // Gộp ảnh cũ + mới để hiển thị
    const allImages = [
        ...(productData.oldImages || []),
        ...(productData.newImages || [])
    ];

    const handleSubmit = async () => {
        try {
            console.log("Updating product:", productData);

            // Chuẩn bị dữ liệu gửi API: chỉ gửi newImages
            const payload = {
                ...productData,
                images: productData.newImages || [] // chỉ file mới
            };

            const res = await updateProduct(id, payload);
            console.log("Product updated response:", res);
            navigate("/seller/products/list");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Cập nhật thất bại. Xem console để biết chi tiết.");
        }
    };


    return (
        <SellerLayout>
            <ProgressBar />
            <div className="product-review">
                <h2>Kiểm tra thông tin trước khi lưu</h2>

                <section>
                    <h3>Ảnh sản phẩm</h3>
                    <div className="image-preview">
                        {allImages.map((img, i) => (
                            <img
                                key={i}
                                src={typeof img === "string" ? img : img.url ? img.url : URL.createObjectURL(img)}
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
                    <p><b>Nổi bật:</b> {productData.isFeatured ? "Có" : "Không"}</p>
                </section>

                <div className="buttons">
                    <button onClick={() => navigate("/seller/product/update/sales/" + id)}>Quay lại</button>
                    <button onClick={handleSubmit}>Hoàn tất</button>
                </div>
            </div>
        </SellerLayout>
    );
}
