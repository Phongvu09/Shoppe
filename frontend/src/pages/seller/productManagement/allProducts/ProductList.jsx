import { useEffect, useState } from "react";
import { getAllProducts } from "../../../../api/product.js"; // chỉnh đường dẫn theo cấu trúc dự án của bạn
import "./ProductList.css";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
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
                    <div className="image-wrapper">
                        <img
                            src={product.images?.[0]?.url || "https://via.placeholder.com/200"}
                            alt={product.name}
                        />
                    </div>
                    <div className="product-info">
                        <h3>{product.name}</h3>
                        <p className="price">{product.price.toLocaleString()} đ</p>
                        <p className="category">{product.category}</p>
                        <p className="stock">
                            {product.stock > 0 ? `Còn ${product.stock} sp` : "Hết hàng"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
