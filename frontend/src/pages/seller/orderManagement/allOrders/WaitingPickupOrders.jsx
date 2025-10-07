import { useEffect, useState } from "react";
import { getWaitingPickupOrders, updateOrderStatus } from "../../../../api/order.js";
import SellerLayout from "../../../../components/SellerLayout.jsx";
import "./WaitingPickupOrders.css";

export default function WaitingPickupOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getWaitingPickupOrders();
                console.log("Waiting Pickup Orders:", res);
                setOrders(res.data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleUpdateStatus = async (id) => {
        try {
            await updateOrderStatus(id, "delivered");
            setOrders(prev => prev.map(o => o._id === id ? { ...o, status: "delivered" } : o));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>Đang tải đơn hàng...</p>;

    return (
        <SellerLayout>
            <div className="waiting-pickup-orders">
                <h2>Đơn hàng chờ lấy hàng</h2>
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
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.userId?.username || "Không rõ"}</td>
                                    <td>{(order.totalAmount || order.totalPrice).toLocaleString()}đ</td>
                                    <td className={`status ${order.status}`}>{order.status}</td>
                                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                                    <td>
                                        <button onClick={() => handleUpdateStatus(order._id)}>
                                            Đánh dấu đã giao
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </SellerLayout>
    );
}
