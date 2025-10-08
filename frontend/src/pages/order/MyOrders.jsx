import { useEffect, useState } from "react";
import api from "@/api/api.js";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOrder, setEditOrder] = useState(null);
  const [newAddress, setNewAddress] = useState("");

  // ✅ Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await api.get("/api/order/my-orders");
      setOrders(res.data?.data || []);
    } catch (err) {
      console.error("❌ Lỗi lấy danh sách đơn hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Cập nhật địa chỉ
  const handleUpdateAddress = async () => {
    try {
      if (!newAddress.trim()) return alert("Vui lòng nhập địa chỉ mới!");
      await api.put(`/api/order/${editOrder._id}/address`, {
        address: newAddress,
      });
      alert("✅ Cập nhật địa chỉ thành công!");
      setEditOrder(null);
      fetchOrders();
    } catch (err) {
      console.error("❌ Lỗi cập nhật địa chỉ:", err);
      alert("Cập nhật thất bại!");
    }
  };

  // ✅ Xóa đơn hàng
  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa đơn hàng này không?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/order/${orderId}`);
      alert("🗑️ Đã xóa đơn hàng thành công!");
      fetchOrders();
    } catch (err) {
      console.error("❌ Lỗi xóa đơn hàng:", err);
      alert("Không thể xóa đơn hàng!");
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center text-gray-500">Đang tải đơn hàng...</div>
    );

  if (!orders.length)
    return (
      <div className="p-8 text-center text-gray-500">
        Chưa có đơn hàng nào 😢
      </div>
    );

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-10">
      <div className="max-w-[1100px] mx-auto bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl font-semibold text-[#ee4d2d] mb-6">
          📦 Đơn hàng của tôi
        </h2>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-md p-4 shadow-sm hover:shadow-md transition-all bg-white"
            >
              <div className="flex justify-between items-center border-b pb-2 mb-3">
                <h3 className="font-semibold text-lg text-gray-800">
                  Mã đơn:{" "}
                  <span className="text-[#ee4d2d]">{order.orderId}</span>
                </h3>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status || "Đang xử lý"}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Danh sách sản phẩm */}
                <div className="space-y-3">
                  {order.products.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 border-b pb-2">
                      <img
                        src={p.images?.[0]?.url || p.images?.[0]}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{p.name}</p>
                        <p className="text-sm text-gray-500">
                          SL: {p.quantity}
                        </p>
                      </div>
                      <p className="text-[#ee4d2d] text-sm font-medium">
                        {(p.price * p.quantity).toLocaleString()} ₫
                      </p>
                    </div>
                  ))}
                </div>

                {/* Thông tin đơn hàng */}
                <div className="space-y-2">
                  <p>
                    <strong>Địa chỉ giao hàng:</strong>
                    <br />
                    <span className="text-gray-700">{order.address}</span>
                  </p>
                  <p>
                    <strong>Phương thức:</strong>{" "}
                    <span className="text-gray-700">
                      {order.paymentMethod || "COD"}
                    </span>
                  </p>
                  <p>
                    <strong>Tổng tiền:</strong>{" "}
                    <span className="text-[#ee4d2d] font-semibold">
                      {order.totalPrice?.toLocaleString()} ₫
                    </span>
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => {
                        setEditOrder(order);
                        setNewAddress(order.address || "");
                      }}
                      className="text-[#ee4d2d] text-sm hover:underline"
                    >
                      ✏️ Cập nhật địa chỉ
                    </button>

                    {/* ✅ Nút xóa đơn hàng */}
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      🗑️ Xóa đơn hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Popup chỉnh sửa địa chỉ ===== */}
      {editOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
            <h3 className="text-lg font-semibold text-[#ee4d2d] mb-4">
              Cập nhật địa chỉ cho đơn {editOrder.orderId}
            </h3>
            <textarea
              rows={3}
              className="w-full border rounded p-2 outline-[#ee4d2d] text-sm"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Nhập địa chỉ mới..."
            ></textarea>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditOrder(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdateAddress}
                className="px-4 py-2 bg-[#ee4d2d] text-white rounded hover:bg-[#d83d1c] text-sm"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
