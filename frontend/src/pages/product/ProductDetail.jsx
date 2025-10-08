import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/api.js";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [isZoom, setIsZoom] = useState(false);
  const [adding, setAdding] = useState(false);

  const allProducts = [
    { id: 1, name: "Ốp lưng iPhone", price: 16900, discount: 32, desc: "Ốp lưng dẻo, bảo vệ chống trầy xước cho iPhone.", images: ["https://picsum.photos/400?1", "https://picsum.photos/401?1", "https://picsum.photos/402?1"] },
    { id: 2, name: "Áo thun nam", price: 82770, discount: 30, desc: "Áo thun cotton mềm mịn, thoáng mát, phong cách trẻ trung.", images: ["https://picsum.photos/400?2", "https://picsum.photos/401?2", "https://picsum.photos/402?2"] },
    { id: 3, name: "Dép nam quai ngang", price: 22000, discount: 56, desc: "Dép cao su bền, êm chân, chống trơn trượt.", images: ["https://picsum.photos/400?3", "https://picsum.photos/401?3", "https://picsum.photos/402?3"] },
    { id: 4, name: "Giày sandal", price: 62000, discount: 24, desc: "Giày sandal nhẹ, thoáng khí, phù hợp dạo phố.", images: ["https://picsum.photos/400?4", "https://picsum.photos/401?4", "https://picsum.photos/402?4"] },
    { id: 5, name: "Kính cường lực", price: 20900, discount: 19, desc: "Kính cường lực chống trầy, bảo vệ điện thoại hiệu quả.", images: ["https://picsum.photos/400?5", "https://picsum.photos/401?5", "https://picsum.photos/402?5"] },
    { id: 6, name: "Tai nghe Bluetooth", price: 99000, discount: 40, desc: "Tai nghe Bluetooth 5.0 âm thanh rõ, pin 12 giờ.", images: ["https://picsum.photos/400?6", "https://picsum.photos/401?6", "https://picsum.photos/402?6"] },
    { id: 7, name: "Gấu bông Vịt bông trầm cảm 3 màu", price: 180000, discount: 10, desc: "Gấu bông mềm mịn, dễ thương, tặng người yêu.", images: ["https://picsum.photos/400?7", "https://picsum.photos/401?7", "https://picsum.photos/402?7"] },
    { id: 8, name: "Giá Treo Quần Áo Đa Dạng", price: 150000, discount: 44, desc: "Giá treo quần áo đa năng, gấp gọn tiện lợi.", images: ["https://picsum.photos/400?8", "https://picsum.photos/401?8", "https://picsum.photos/402?8"] },
    { id: 9, name: "Set bộ áo thun chất bozip", price: 33000, discount: 45, desc: "Set áo thun bozip trẻ trung, chất cotton thoáng mát.", images: ["https://picsum.photos/400?9", "https://picsum.photos/401?9", "https://picsum.photos/402?9"] },
    { id: 10, name: "Tai nghe không dây X55", price: 60000, discount: 33, desc: "Tai nghe X55 kết nối không dây, bass mạnh.", images: ["https://picsum.photos/400?10", "https://picsum.photos/401?10", "https://picsum.photos/402?10"] },
    { id: 11, name: "Quạt cầm tay mini DIDOOLGT", price: 85000, discount: 43, desc: "Quạt mini sạc USB, tiện lợi khi đi du lịch.", images: ["https://picsum.photos/400?11", "https://picsum.photos/401?11", "https://picsum.photos/402?11"] },
    { id: 12, name: "Lược chải tóc mát xa da đầu", price: 12900, discount: 36, desc: "Lược massage thư giãn, chăm sóc tóc khỏe đẹp.", images: ["https://picsum.photos/400?12", "https://picsum.photos/401?12", "https://picsum.photos/402?12"] },
  ];

  useEffect(() => {
    const found = allProducts.find((p) => p.id === Number(id));
    if (found) {
      setProduct(found);
      setMainImg(found.images[0]);
    }
  }, [id]);

  // ✅ Thêm vào giỏ hàng
  const handleAddToCart = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Vui lòng đăng nhập để thêm vào giỏ hàng!");
      navigate("/login");
      return;
    }

    setAdding(true);
    try {
      await api.post("/api/cart", {
        productId: product.id,
        name: product.name,
        price: product.price,
        img: product.images[0],
        quantity: 1,
      });
      alert("🛒 Đã thêm vào giỏ hàng!");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error("❌ Lỗi thêm giỏ hàng:", err);
      alert("Lỗi khi thêm vào giỏ hàng!");
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout", { state: { product } });
    }
  };

  if (!product)
    return <div className="p-8 text-center text-gray-500">Không tìm thấy sản phẩm...</div>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
      {/* Ảnh sản phẩm */}
      <div className="flex flex-col gap-3">
        <div
          className="relative w-full h-[400px] rounded-lg overflow-hidden shadow cursor-pointer group"
          onClick={() => setIsZoom(true)}
        >
          <img src={mainImg} alt={product.name} className="w-full h-full object-contain" />
        </div>
        <div className="flex gap-2">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              onMouseEnter={() => setMainImg(img)}
              className={`w-20 h-20 object-cover rounded-md border-2 cursor-pointer transition-all ${
                mainImg === img ? "border-[#ee4d2d]" : "border-transparent hover:border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div>
        <h1 className="text-2xl font-bold mb-3">{product.name}</h1>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#ee4d2d] text-3xl font-semibold">
            {product.price.toLocaleString()} ₫
          </span>
          <span className="text-gray-400 line-through text-sm">
            {(product.price / (1 - product.discount / 100)).toLocaleString()} ₫
          </span>
          <span className="text-[#ee4d2d] text-sm font-semibold">-{product.discount}%</span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6">{product.desc}</p>

        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="flex-1 border border-[#ee4d2d] text-[#ee4d2d] py-3 rounded hover:bg-[#fff1ec] font-medium transition-all disabled:opacity-50"
          >
            {adding ? "Đang thêm..." : "Thêm vào giỏ hàng"}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-[#ee4d2d] text-white py-3 rounded hover:bg-[#d83d1c] font-medium transition-all"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
