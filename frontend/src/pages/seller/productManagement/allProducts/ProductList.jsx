import { useEffect, useState } from "react";
import { getAllProducts } from "../../../../api/product.js";
import "./ProductList.css";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                console.log("API Products:", data);

                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (Array.isArray(data.data)) {
                    setProducts(data.data);
                } else {
                    setError("Dữ liệu sản phẩm không hợp lệ");
                }
            } catch (err) {
                setError(err.message || "Lỗi khi tải sản phẩm");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <p className="loading">Đang tải sản phẩm...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="product-list">
            {products.map((product) => (
                <div className="product-card" key={product._id}>
                    {/* Ảnh */}
                    <div className="image-wrapper">
                        <img
                            src={
                                product.images?.[0]?.url ||
                                "https://via.placeholder.com/200"
                            }
                            alt={product.name}
                        />
                    </div>

                    {/* Thông tin */}
                    <div className="product-info">
                        <h3 className="name">{product.name}</h3>

                        <p className="price">
                            {typeof product.price === "number"
                                ? product.price.toLocaleString() + " đ"
                                : "Chưa có giá"}
                        </p>

                        <p className="category">
                            Danh mục: {product.category || "N/A"}
                        </p>

                        <p className="stock">
                            {typeof product.stock === "number"
                                ? product.stock > 0
                                    ? `Còn ${product.stock} sản phẩm`
                                    : "Hết hàng"
                                : "Không rõ tồn kho"}
                        </p>

                        <p className="desc">
                            {product.description?.length > 60
                                ? product.description.slice(0, 60) + "..."
                                : product.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
