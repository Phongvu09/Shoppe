import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsByShop, deleteProduct } from "../../../../api/product.js";
import "./ProductList.css";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProductsByShop(page, limit);
                console.log("API Response:", data);
                if (Array.isArray(data.data?.products)) {
                    setProducts(data.data.products);
                    setTotalPages(data.data.totalPages || 1);
                } else {
                    setError("Dữ liệu sản phẩm không hợp lệ");
                    console.log("Invalid data structure:", data);
                }
            } catch (err) {
                setError(err.message || "Lỗi khi tải sản phẩm");
                console.log("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [page]);

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            try {
                await deleteProduct(id);
                setProducts(products.filter((product) => product._id !== id));
                alert("Xóa sản phẩm thành công!");
            } catch (err) {
                setError(err.message || "Lỗi khi xóa sản phẩm");
                console.log("Error deleting product:", err);
            }
        }
    };


    const handleEditProduct = (id) => {
        navigate(`/seller/product/update/info/${id}`);
    };

    const handleNextPage = () => page < totalPages && setPage(page + 1);
    const handlePrevPage = () => page > 1 && setPage(page - 1);

    if (loading) return <p className="loading">Đang tải sản phẩm...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="product-list">
            <div className="product-header">
                <h2>Danh sách sản phẩm</h2>
                <button
                    className="add-product-btn"
                    onClick={() => navigate("/seller/product/info")}
                >
                    Thêm sản phẩm mới
                </button>
            </div>
            <div className="product-table">
                <table>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá (VNĐ)</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <img
                                        src={product.images?.[0]?.url || "https://via.placeholder.com/50"}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.stock || 0}</td>
                                <td>{(product.price || 0).toLocaleString()} VNĐ</td>
                                <td>{product.isActive ? "Hoạt động" : "Đã khóa"}</td>
                                <td>
                                    <button
                                        className="action-btn detail-btn"
                                        onClick={() => navigate(`/seller/products/detail/${product._id}`)}
                                    >
                                        Chi tiết
                                    </button>
                                    <button
                                        className="action-btn detail-btn"
                                        onClick={() => handleEditProduct(product._id)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => handleDeleteProduct(product._id)}
                                    >
                                        Xóa
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="pagination-button"
                >
                    Trang trước
                </button>
                <span className="page-info">Trang {page} / {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className="pagination-button"
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
}