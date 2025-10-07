import { useEffect, useState } from "react";
import { getOrderByShopId } from "../../../../api/order.js";
import "./SellerOrders.css";
import SellerLayout from "../../../../components/SellerLayout.jsx";

export default function SellerOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const shopId = localStorage.getItem("shopId");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getOrderByShopId(shopId);
                console.log("✅ Orders received:", res);

                // Dữ liệu thực nằm trong res.data
                setOrders(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                console.error("❌ Lỗi khi lấy orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [shopId]);


    if (loading) return <p>Đang tải dữ liệu...</p>;

    return (
        <SellerLayout>
            <div className="seller-orders">
                <h2>Quản lý đơn hàng</h2>

                {orders.length === 0 ? (
                    <p>Không có đơn hàng nào</p>
                ) : (
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Mã đơn</th>
                                <th>Khách hàng</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.orderId}</td>
                                    <td>{order.userId?.username || "Không rõ"}</td>
                                    <td>{order.totalAmount?.toLocaleString() || order.totalPrice?.toLocaleString()}đ</td>
                                    <td className={`status ${order.status}`}>{order.status}</td>
                                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </SellerLayout>
    );
}
