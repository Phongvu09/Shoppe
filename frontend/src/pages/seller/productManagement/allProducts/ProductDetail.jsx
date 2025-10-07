import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../../../api/product.js";
import SellerLayout from "../../../../components/SellerLayout.jsx";
import "./ProductDetail.css";

export default function SellerProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProductById(id);
                setProduct(res.data);
            } catch (err) {
                setError("Không thể tải chi tiết sản phẩm");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="loading">Đang tải...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!product) return <div className="error">Không tìm thấy sản phẩm</div>;

    return (
        <SellerLayout>
            <div className="seller-detail-container">
                <div className="seller-detail-header">
                    <button className="action-btn back-btn" onClick={() => navigate(-1)}>← Quay lại</button>
                    <h2>Chi tiết sản phẩm</h2>
                    <button
                        className="action-btn edit-btn"
                        onClick={() => navigate(`/seller/product/update/info/${id}`)}
                    >
                        Chỉnh sửa
                    </button>
                </div>

                <div className="seller-detail-body">
                    <div className="seller-detail-left">
                        <div className="main-image">
                            <img
                                src={product.images?.[0]?.url || "https://via.placeholder.com/400"}
                                alt={product.name}
                            />
                        </div>

                        <div className="image-gallery">
                            {product.images?.map((img, index) => (
                                <img key={index} src={img.url} alt={`Ảnh ${index + 1}`} />
                            ))}
                        </div>
                    </div>

                    <div className="seller-detail-right">
                        <h1>{product.name}</h1>
                        <p className="price">{product.price.toLocaleString()} ₫</p>

                        <div className="info-grid">
                            <p><strong>Danh mục:</strong> {product.category}</p>
                            <p><strong>Trọng lượng:</strong> {product.weight} g</p>
                            <p><strong>Tồn kho:</strong> {product.stock}</p>
                            <p><strong>Đã bán:</strong> {product.soldQuantity}</p>
                            <p><strong>Chất liệu:</strong> {product.material || "Không có"}</p>
                            <p><strong>Xuất xứ:</strong> {product.origin || "Không có"}</p>
                            <p><strong>Màu sắc:</strong> {product.colors?.join(", ") || "Không có"}</p>
                            <p><strong>Kích thước:</strong> {product.sizes?.join(", ") || "Không có"}</p>
                        </div>

                        <div className="description">
                            <h3>Mô tả</h3>
                            <p>{product.description || "Không có mô tả"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}
