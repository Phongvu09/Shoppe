// src/pages/home/HomePage.jsx
import { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/api.js";

export default function HomePage() {
  const [flashProducts, setFlashProducts] = useState([]);
  const navigate = useNavigate();

  // ===== GỌI API FLASH SALE =====
  useEffect(() => {
    api
      .get("/product?limit=6")
      .then((res) => setFlashProducts(res.data || []))
      .catch(() => {
        setFlashProducts([
          { id: 1, name: "Ốp lưng iPhone", price: 16900, discount: 32, img: "https://picsum.photos/200?1" },
          { id: 2, name: "Áo thun nam", price: 82770, discount: 30, img: "https://picsum.photos/200?2" },
          { id: 3, name: "Dép nam quai ngang", price: 22000, discount: 56, img: "https://picsum.photos/200?3" },
          { id: 4, name: "Giày sandal", price: 62000, discount: 24, img: "https://picsum.photos/200?4" },
          { id: 5, name: "Kính cường lực", price: 20900, discount: 19, img: "https://picsum.photos/200?5" },
          { id: 6, name: "Tai nghe Bluetooth", price: 99000, discount: 40, img: "https://picsum.photos/200?6" },
        ]);
      });
  }, []);

  // ===== DATA TĨNH =====
  const quickActions = useMemo(
    () => [
      { label: "Deal Từ 1.000Đ", icon: "🧧" },
      { label: "Shopee Xử Lý", icon: "📦" },
      { label: "Deal Hot Giờ Vàng", icon: "🔥" },
      { label: "Shopee Style Voucher 30%", icon: "🎟️" },
      { label: "Săn Ngay 100.000 Xu", icon: "🎁" },
      { label: "Khách Hàng Thân Thiết", icon: "🏅" },
    ],
    []
  );

  const categories = useMemo(
    () => [
      "Thời Trang Nam",
      "Điện Thoại & Phụ Kiện",
      "Thiết Bị Điện Tử",
      "Máy Tính & Laptop",
      "Máy Ảnh & Máy Quay Phim",
      "Đồng Hồ",
      "Giày Dép Nam",
      "Thiết Bị Điện Gia Dụng",
      "Thể Thao & Du Lịch",
      "Ô Tô & Xe Máy & Xe Đạp",
    ],
    []
  );

  const suggestProducts = [
    {
      id: 1,
      img: "https://down-vn.img.susercontent.com/file/sg-11134201-7rdws-lvbe7adpfgrn7a",
      name: "Gấu bông Vịt bông trầm cảm 3 màu",
      price: "180.000₫",
      discount: "-10%",
    },
    {
      id: 2,
      img: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm1v84eq9cgc54",
      name: "Giá Treo Quần Áo Đa Dạng",
      price: "150.000₫",
      discount: "-44%",
    },
    {
      id: 3,
      img: "https://down-vn.img.susercontent.com/file/vn-11134201-23030-5bqz1s3nbbnv39",
      name: "Set bộ áo thun chất bozip",
      price: "33.000₫",
      discount: "-45%",
    },
    {
      id: 4,
      img: "https://down-vn.img.susercontent.com/file/sg-11134201-23020-9i3pyjz5pfnv97",
      name: "Tai nghe không dây X55",
      price: "60.000₫",
      discount: "-33%",
    },
    {
      id: 5,
      img: "https://down-vn.img.susercontent.com/file/vn-11134201-23020-j8z6ycptpfnv13",
      name: "Quạt cầm tay mini DIDOOLGT",
      price: "85.000₫",
      discount: "-43%",
    },
    {
      id: 6,
      img: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd3q-lsfjld4pm0d5f5",
      name: "Lược chải tóc mát xa da đầu",
      price: "12.900₫",
      discount: "-36%",
    },
  ];

  // ===== RENDER =====
  return (
    <div className="bg-[#f5f5f5] pb-12">
      {/* ===== BANNERS ===== */}
      <section className="max-w-[1200px] mx-auto px-4 pt-4 grid gap-4 md:grid-cols-3">
        <img
          onClick={() => navigate("/flashsale")}
          src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200"
          alt="main"
          className="md:col-span-2 w-full h-[260px] md:h-[300px] rounded-lg object-cover hover:shadow-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer"
        />
        <div className="flex flex-col gap-4">
          <img
            onClick={() => navigate("/category/1")}
            src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=800"
            alt="right-1"
            className="w-full h-[128px] md:h-[140px] rounded-lg object-cover hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
          />
          <img
            onClick={() => navigate("/category/2")}
            src="https://images.unsplash.com/photo-1518444028785-8ff8a4a185d7?q=80&w=800"
            alt="right-2"
            className="w-full h-[128px] md:h-[140px] rounded-lg object-cover hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
          />
        </div>
      </section>

      {/* ===== QUICK ACTIONS ===== */}
      <section className="bg-white mt-4 border-y">
        <div className="max-w-[1200px] mx-auto px-4 py-5 grid grid-cols-3 md:grid-cols-6 gap-4">
          {quickActions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => console.log("Clicked:", q.label)}
              className="flex flex-col items-center gap-2 group hover:scale-105 transition-transform duration-200"
            >
              <div className="w-[72px] h-[72px] rounded-full bg-[#fef3ed] text-[#ee4d2d] flex items-center justify-center text-2xl shadow-[inset_0_0_0_1px_#ffd6c9] group-hover:bg-[#fee2e2]">
                {q.icon}
              </div>
              <div className="text-[13px] text-gray-700 text-center leading-tight group-hover:text-[#ee4d2d]">
                {q.label}
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="h-3 bg-[#f5f5f5] border-b"></div>

      {/* ===== CATEGORIES ===== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-4 bg-white rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b bg-white/60">
          <h2 className="text-[18px] font-bold text-gray-800 tracking-tight">
            DANH MỤC
          </h2>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10 gap-4">
          {categories.map((name, i) => (
            <div
              key={i}
              onClick={() => navigate(`/category/${i + 1}`)}
              className="group bg-white border rounded-lg px-3 py-4 flex flex-col items-center hover:shadow-md hover:-translate-y-[2px] transition-all duration-200 cursor-pointer"
            >
              <img
                src={`https://picsum.photos/seed/cat${i}/160/160`}
                alt={name}
                className="w-16 h-16 rounded-full object-cover mb-3 ring-1 ring-gray-200 group-hover:ring-[#ee4d2d]/40 group-hover:scale-105 transition-transform"
              />
              <span className="text-[13px] text-gray-800 text-center leading-tight group-hover:text-[#ee4d2d]">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FLASH SALE ===== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-6 bg-white rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-[18px] font-bold text-gray-800 flex items-center gap-1">
            <span className="text-[#ee4d2d]">⚡</span> FLASH SALE
          </h2>
          <button
            onClick={() => navigate("/flashsale")}
            className="text-[13px] text-[#ee4d2d] hover:underline"
          >
            Xem tất cả &gt;
          </button>
        </div>

        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {flashProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              className="border rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-[2px] transition-all cursor-pointer"
            >
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-[150px] object-cover group-hover:scale-105 transition-transform"
              />
              <div className="p-2">
                <div className="text-sm line-clamp-2 min-h-[32px]">
                  {p.name}
                </div>
                <div className="text-[#ee4d2d] font-bold mt-1">
                  {p.price.toLocaleString()} ₫
                </div>
                <div className="text-xs text-gray-500">-{p.discount}%</div>
                <button className="w-full mt-2 text-[12px] py-[2px] rounded bg-[#fee2e2] text-[#ee4d2d] font-medium">
                  ĐANG BÁN CHẠY
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GỢI Ý HÔM NAY ===== */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10">
        <h2 className="text-[#ee4d2d] text-[20px] font-semibold text-center mb-6">
          GỢI Ý HÔM NAY
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {suggestProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              className="bg-white border rounded-md shadow-sm hover:shadow-lg cursor-pointer transition-all duration-200 group hover:-translate-y-[3px]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-1 left-1 bg-[#ee4d2d] text-white text-xs px-1.5 py-[2px] rounded">
                  10.10
                </span>
                <span className="absolute top-1 right-1 bg-[#ffe6e1] text-[#ee4d2d] text-[11px] font-semibold px-1.5 py-[1px] rounded">
                  {p.discount}
                </span>
              </div>
              <div className="p-2 text-sm text-gray-800">
                <h3 className="line-clamp-2 min-h-[40px] text-[13px] leading-tight group-hover:text-[#ee4d2d]">
                  {p.name}
                </h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[#ee4d2d] font-semibold">
                    {p.price}
                  </span>
                  <span className="text-gray-400 text-xs">Đã bán 1k+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
