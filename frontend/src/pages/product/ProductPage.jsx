import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api.js";

export default function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  (async () => {
    try {
      const { data } = await api.get("/api/product");
      const items = data?.items || data || [];
      setProducts(Array.isArray(items) ? items : []);
    } catch (e) {
      console.error("Fetch product error:", e.message);
      setProducts([]); // fallback an toàn
    }
  })();
}, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-6">
      <h1 className="text-lg font-bold mb-4">Tất cả sản phẩm</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <Link key={p._id || p.id} to={`/product/${p._id || p.id}`} className="bg-white border rounded hover:shadow-md">
            <img src={p.image || `https://picsum.photos/seed/${p._id || p.id}/300/300`} alt={p.name} className="w-full h-40 object-cover"/>
            <div className="p-2">
              <div className="text-sm line-clamp-2">{p.name}</div>
              <div className="text-red-600 font-bold">₫{(p.salePrice ?? p.price ?? 0).toLocaleString("vi-VN")}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
