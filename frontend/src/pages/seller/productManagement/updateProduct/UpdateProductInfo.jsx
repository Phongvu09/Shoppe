import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../updateProduct/ProductContext.jsx";
import { useEffect, useState } from "react";
import { getProductById } from "../../../../api/product.js";
import SellerLayout from "../../../../components/SellerLayout.jsx";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar.jsx";
import "./UpdateProductInfo.css"; // dùng chung với adding

export default function UpdateProductInfo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { productData, setProductData } = useProduct();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});

    // Lấy thông tin sản phẩm từ API
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProductById(id);
                const data = res.data;
                setProductData({
                    ...productData,
                    name: data.name || "",
                    description: data.description || "",
                    oldImages: data.images || [], // giữ ảnh cũ
                    newImages: [], // chưa chọn ảnh mới
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);


    if (loading) return <p>Đang tải...</p>;

    // Thêm handle để xóa ảnh
    const handleRemoveOldImage = (index) => {
        const updatedOldImages = [...(productData.oldImages || [])];
        updatedOldImages.splice(index, 1);
        setProductData({ ...productData, oldImages: updatedOldImages });
    };

    const handleRemoveNewImage = (index) => {
        const updatedNewImages = [...(productData.newImages || [])];
        updatedNewImages.splice(index, 1);
        setProductData({ ...productData, newImages: updatedNewImages });
    };

    // Khi validate, kiểm tra cả oldImages + newImages
    const handleNext = () => {
        const newErrors = {};
        const totalImages = (productData.oldImages?.length || 0) + (productData.newImages?.length || 0);
        if (totalImages === 0) newErrors.images = "Vui lòng chọn ít nhất 1 ảnh";
        if (!productData.name || productData.name.length < 5)
            newErrors.name = "Tên sản phẩm có ít nhất 5 chữ";
        if (!productData.description || productData.description.length < 20)
            newErrors.description = "Mô tả sản phẩm ít nhất 20 chữ";

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }
        navigate("/seller/product/update/detail/" + id);
    };


    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setProductData({
            ...productData,
            newImages: [...(productData.newImages || []), ...files],
        });
    };

    return (
        <SellerLayout>
            <ProgressBar />
            <div className="product-info">
                <h2>Cập nhật thông tin cơ bản</h2>

                <label>
                    Ảnh sản phẩm
                    <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                    <div className="image-preview">
                        {/* Ảnh cũ */}
                        {productData.oldImages?.map((img, i) => (
                            <div key={i} className="image-wrapper">
                                <img src={img.url || img} alt={`old-${i}`} width="100" />
                                <span className="remove-image" onClick={() => handleRemoveOldImage(i)}>×</span>
                            </div>
                        ))}

                        {/* Ảnh mới */}
                        {productData.newImages?.map((file, i) => (
                            <div key={i} className="image-wrapper">
                                <img src={URL.createObjectURL(file)} alt={`new-${i}`} width="100" />
                                <span className="remove-image" onClick={() => handleRemoveNewImage(i)}>×</span>
                            </div>
                        ))}
                    </div>


                </label>

                <label>
                    Tên sản phẩm
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                    />
                    {error.name && <p className="error">{error.name}</p>}
                </label>

                <label>
                    Mô tả sản phẩm
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                    />
                    {error.description && <p className="error">{error.description}</p>}
                </label>

                <div className="buttons">
                    <button onClick={() => navigate("/seller/products/list")}>Quay lại</button>
                    <button onClick={handleNext}>Tiếp theo</button>
                </div>
            </div>
        </SellerLayout>
    );
}
