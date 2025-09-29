import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api.js";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/api/product/${id}`);
        setProduct(data);
      } catch (e) {
        console.error("Fetch product detail error:", e.message);
      }
    })();
  }, [id]);

  if (!product) return <div className="p-4">Đang tải...</div>;

  return (
    <div className="max-w-[1000px] mx-auto p-4 grid md:grid-cols-2 gap-6">
      <img src={product.image || `https://picsum.photos/seed/${product._id || id}/500/500`} alt={product.name} className="rounded w-full object-cover"/>
      <div>
        <h1 className="text-xl font-bold mb-2">{product.name}</h1>
        <div className="text-red-600 font-bold text-2xl mb-4">₫{(product.salePrice ?? product.price ?? 0).toLocaleString("vi-VN")}</div>
        <button className="bg-orange-600 text-white px-6 py-3 rounded font-semibold hover:bg-orange-700">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
