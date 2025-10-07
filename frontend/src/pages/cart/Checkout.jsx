// src/pages/cart/Checkout.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
    if (!state?.product) navigate("/");
  }, [user, state, navigate]);

  const product = state?.product;
  if (!product) return null;

  const handleOrder = () => {
    // Hiển thị popup cảm ơn
    setShowSuccess(true);

    // Tự động quay lại trang chủ sau 3 giây
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/");
    }, 3000);
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-10 relative">
      <div className="max-w-[1100px] mx-auto bg-white rounded-lg p-6 shadow">
        {/* Địa chỉ nhận hàng */}
        <h2 className="text-xl font-semibold mb-4 text-[#ee4d2d]">Địa Chỉ Nhận Hàng</h2>
        <div className="border p-4 rounded-md mb-6 flex justify-between">
          <div>
            <p className="font-medium">
              {user?.username || "Người mua"}{" "}
              <span className="text-gray-500">(0{user?.phone || "..."})</span>
            </p>
            <p className="text-gray-700">
              123 Đường ABC, Quận 1, TP. Hồ Chí Minh
            </p>
          </div>
          <button className="text-[#ee4d2d] text-sm hover:underline">
            Thay đổi
          </button>
        </div>

        {/* Sản phẩm */}
        <h2 className="text-xl font-semibold mb-4 text-[#ee4d2d]">Sản phẩm</h2>
        <div className="border-b pb-4 mb-4 flex items-center gap-4">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-24 h-24 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-gray-500 text-sm mt-1">Số lượng: 1</p>
          </div>
          <p className="text-[#ee4d2d] font-semibold">
            {product.price.toLocaleString()} ₫
          </p>
        </div>

        {/* Tổng tiền */}
        <div className="flex justify-end items-center gap-6 mt-6 text-lg">
          <p>Tổng tiền hàng:</p>
          <p className="text-[#ee4d2d] font-semibold">
            {product.price.toLocaleString()} ₫
          </p>
        </div>

        {/* Nút đặt hàng */}
        <div className="flex justify-end mt-10">
          <button
            onClick={handleOrder}
            className="bg-[#ee4d2d] text-white px-8 py-3 rounded font-medium text-lg hover:bg-[#d83d1c] transition-all"
          >
            Đặt hàng
          </button>
        </div>
      </div>

      {/* ===== Popup đặt hàng thành công ===== */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-lg shadow-lg px-8 py-6 text-center w-[400px] animate-fadeIn">
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="text-xl font-bold text-[#ee4d2d] mb-2">
              Đặt hàng thành công!
            </h2>
            <p className="text-gray-600 mb-6">
              Cảm ơn bạn đã mua hàng tại Shopee Lite 💖
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#ee4d2d] text-white px-6 py-2 rounded-md hover:bg-[#d83d1c] transition-all"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
