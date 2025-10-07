import { useEffect, useState } from "react";
import { getDeliveredOrders } from "../../../../api/order.js";
import SellerLayout from "../../../../components/SellerLayout.jsx";
import "./DeliveredOrders.css";

export default function DeliveredOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getDeliveredOrders();
                console.log("Delivered Orders:", res);
                setOrders(res.data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <p>Đang tải đơn hàng...</p>;

    return (
        <SellerLayout>
            <div className="delivered-orders">
                <h2>Đơn hàng đã giao</h2>
                {orders.length === 0 ? (
                    <p>Không có đơn hàng nào</p>
                ) : (
                    <table>
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
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order.orderId}</td>
                                    <td>{order.userId?.username || "Không rõ"}</td>
                                    <td>{(order.totalAmount || order.totalPrice).toLocaleString()}đ</td>
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
