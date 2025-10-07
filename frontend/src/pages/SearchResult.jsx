import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  // Dữ liệu sản phẩm từ HomePage (anh có thể copy y chang)
  const allProducts = [
    // Flash sale
    { id: 1, name: "Ốp lưng iPhone", price: 16900, discount: 32, img: "https://picsum.photos/200?1" },
    { id: 2, name: "Áo thun nam", price: 82770, discount: 30, img: "https://picsum.photos/200?2" },
    { id: 3, name: "Dép nam quai ngang", price: 22000, discount: 56, img: "https://picsum.photos/200?3" },
    { id: 4, name: "Giày sandal", price: 62000, discount: 24, img: "https://picsum.photos/200?4" },
    { id: 5, name: "Kính cường lực", price: 20900, discount: 19, img: "https://picsum.photos/200?5" },
    { id: 6, name: "Tai nghe Bluetooth", price: 99000, discount: 40, img: "https://picsum.photos/200?6" },

    // Gợi ý hôm nay
    { id: 7, name: "Gấu bông Vịt bông trầm cảm 3 màu", price: 180000, discount: 10, img: "https://down-vn.img.susercontent.com/file/sg-11134201-7rdws-lvbe7adpfgrn7a" },
    { id: 8, name: "Giá Treo Quần Áo Đa Dạng", price: 150000, discount: 44, img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm1v84eq9cgc54" },
    { id: 9, name: "Set bộ áo thun chất bozip", price: 33000, discount: 45, img: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-5bqz1s3nbbnv39" },
    { id: 10, name: "Tai nghe không dây X55", price: 60000, discount: 33, img: "https://down-vn.img.susercontent.com/file/sg-11134201-23020-9i3pyjz5pfnv97" },
    { id: 11, name: "Quạt cầm tay mini DIDOOLGT", price: 85000, discount: 43, img: "https://down-vn.img.susercontent.com/file/vn-11134201-23020-j8z6ycptpfnv13" },
    { id: 12, name: "Lược chải tóc mát xa da đầu", price: 12900, discount: 36, img: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd3q-lsfjld4pm0d5f5" },
  ];

  // Lọc sản phẩm theo từ khóa
  const filtered = useMemo(
    () => allProducts.filter(p => p.name.toLowerCase().includes(query)),
    [query]
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">
        Kết quả tìm kiếm cho: <span className="text-[#ee4d2d]">"{query}"</span>
      </h2>

      {filtered.length === 0 ? (
        <p className="text-gray-500">Không tìm thấy sản phẩm nào.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {filtered.map(p => (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              className="bg-white border rounded-md p-2 hover:shadow-lg cursor-pointer transition-all duration-200"
            >
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-sm font-medium line-clamp-2">{p.name}</h3>
              <p className="text-[#ee4d2d] font-bold mt-1">{p.price.toLocaleString()} ₫</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
