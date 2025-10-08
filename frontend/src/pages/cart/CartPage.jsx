import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/api.js";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Lấy dữ liệu giỏ hàng
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await api.get("/api/cart");
      setCart(res.data);
    } catch (err) {
      console.error("❌ Lỗi lấy giỏ hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Tăng/giảm số lượng
  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      await api.put("/api/cart", { productId, quantity: newQty });
      fetchCart();
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error("❌ Lỗi cập nhật số lượng:", err);
    }
  };

  // ✅ Xóa sản phẩm khỏi giỏ hàng
  const removeItem = async (productId) => {
    if (!window.confirm("Xóa sản phẩm này khỏi giỏ hàng?")) return;
    try {
      await api.delete(`/api/cart/${productId}`);
      fetchCart();
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error("❌ Lỗi xóa sản phẩm:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Tính tổng tiền
  const totalPrice =
    cart?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  if (loading)
    return (
      <div className="p-8 text-center text-gray-500">Đang tải giỏ hàng...</div>
    );

  if (!cart || cart.items?.length === 0)
    return (
      <div className="p-8 text-center text-gray-500">
        Giỏ hàng của bạn đang trống 😢{" "}
        <span
          onClick={() => navigate("/")}
          className="text-[#ee4d2d] underline cursor-pointer"
        >
          Mua sắm ngay
        </span>
      </div>
    );

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-[#ee4d2d]">
        🛒 Giỏ hàng của bạn
      </h2>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-[#ee4d2d] font-semibold">
                  {item.price.toLocaleString()} ₫
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded overflow-hidden">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  −
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  ＋
                </button>
              </div>
              <button
                onClick={() => removeItem(item.productId)}
                className="text-red-500 hover:text-red-600 text-sm"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4 flex justify-between items-center">
        <p className="text-lg font-semibold text-gray-800">
          Tổng cộng:{" "}
          <span className="text-[#ee4d2d]">
            {totalPrice.toLocaleString()} ₫
          </span>
        </p>
        <button
          onClick={() =>
  navigate("/checkout", {
    state: {
      fromCart: true, // đánh dấu là từ giỏ hàng qua
      cartItems: cart.items, // truyền danh sách sản phẩm
      totalPrice,
    },
  })
}
    >
          Thanh toán
        </button>
      </div>
    </div>
  );
}
