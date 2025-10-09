import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/api.js";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("123 Đường ABC, Quận 1, TP. Hồ Chí Minh");
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
    if (!state?.cartItems && !state?.product) navigate("/");
  }, [user, state, navigate]);

  const products = state?.cartItems || [
    {
      productId: state?.product?.id?.toString(),
      name: state?.product?.name,
      price: state?.product?.price,
      quantity: 1,
      images: [{ url: state?.product?.images?.[0], public_id: "demo" }],
    },
  ];

  const totalPrice =
    state?.totalPrice ||
    products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  // ✅ Gửi đơn hàng thật
  const handleOrder = async () => {
    try {
      setLoading(true);
      await api.post("/api/order", {
        products,
        totalPrice,
        paymentMethod: "COD",
        address, // dùng địa chỉ đã chỉnh sửa
      });
      setShowSuccess(true);
      window.dispatchEvent(new Event("cart-updated"));
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error("❌ Lỗi đặt hàng:", err);
      alert("Đặt hàng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-10 relative">
      <div className="max-w-[1100px] mx-auto bg-white rounded-lg p-6 shadow">
        {/* ===== ĐỊA CHỈ NHẬN HÀNG ===== */}
        <h2 className="text-xl font-semibold mb-4 text-[#ee4d2d]">Địa chỉ nhận hàng</h2>

        <div className="border p-4 rounded-md mb-6 flex justify-between">
          <div className="flex-1">
            <p className="font-medium">
              {user?.username}{" "}
              <span className="text-gray-500">(0{user?.phone || "..."})</span>
            </p>

            {isEditingAddress ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border mt-2 w-full p-2 rounded outline-[#ee4d2d]"
                placeholder="Nhập địa chỉ mới..."
              />
            ) : (
              <p className="text-gray-700 mt-1">{address}</p>
            )}
          </div>

          <button
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            className="text-[#ee4d2d] text-sm hover:underline ml-4"
          >
            {isEditingAddress ? "Hoàn tất" : "Thay đổi"}
          </button>
        </div>

        {/* ===== SẢN PHẨM ===== */}
        <h2 className="text-xl font-semibold mb-4 text-[#ee4d2d]">Sản phẩm</h2>
        {products.map((p) => (
          <div key={p.productId} className="border-b pb-4 mb-4 flex items-center gap-4">
            <img
              src={p.images?.[0]?.url || p.images?.[0]}
              alt={p.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{p.name}</h3>
              <p className="text-gray-500 text-sm mt-1">Số lượng: {p.quantity}</p>
            </div>
            <p className="text-[#ee4d2d] font-semibold">
              {(p.price * p.quantity).toLocaleString()} ₫
            </p>
          </div>
        ))}

        {/* Tổng tiền */}
        <div className="flex justify-end items-center gap-6 mt-6 text-lg">
          <p>Tổng tiền hàng:</p>
          <p className="text-[#ee4d2d] font-semibold">
            {totalPrice.toLocaleString()} ₫
          </p>
        </div>

        {/* Nút đặt hàng */}
        <div className="flex justify-end mt-10">
          <button
            onClick={handleOrder}
            disabled={loading}
            className="bg-[#ee4d2d] text-white px-8 py-3 rounded font-medium text-lg hover:bg-[#d83d1c] transition-all disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Đặt hàng"}
          </button>
        </div>
      </div>

      {/* ===== Popup đặt hàng thành công ===== */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-lg shadow-lg px-8 py-6 text-center w-[400px]">
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="text-xl font-bold text-[#ee4d2d] mb-2">
              Đặt hàng thành công!
            </h2>
            <p className="text-gray-600 mb-6">
              Cảm ơn bạn đã mua hàng tại Shopee Lite 💖
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#ee4d2d] text-white px-6 py-2 rounded-md hover:bg-[#d83d1c]"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
