import { useState, useEffect } from "react";
import { getAllProducts } from "../../api/product.js";

const ProductPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getAllProducts();
                console.log("Fetched products:", products);
                setProducts(products.data || products); // tuỳ response từ backend
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Product Page</h1>

            {/* Hiển thị danh sách sản phẩm */}
            <ul>
                {products.map((product) => (
                    <li key={product._id || product.productId}>
                        <strong>{product.name}</strong> - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductPage;
