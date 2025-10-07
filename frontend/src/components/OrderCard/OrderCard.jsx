import React, { useState } from "react";
import {
    updateOrderStatus,
    confirmOrder,
} from "../../api/order.js";
import "./OrderCard.css";

export default function OrderCard({ order, onStatusChange }) {
    const [loading, setLoading] = useState(false);

    const handleStatusUpdate = async (newStatus) => {
        try {
            setLoading(true);
            if (newStatus === "waiting_pickup") {
                await confirmOrder(order._id);
            } else {
                await updateOrderStatus(order._id, newStatus);
            }
            onStatusChange && onStatusChange();
        } catch (error) {
            console.error("❌ Lỗi cập nhật trạng thái:", error);
            alert("Không thể cập nhật trạng thái đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    const renderActionButton = () => {
        switch (order.status) {
            case "pending":
                return (
                    <button
                        className="order-btn confirm"
                        onClick={() => handleStatusUpdate("waiting_pickup")}
                        disabled={loading}
                    >
                        {loading ? "Đang xác nhận..." : "Xác nhận đơn hàng"}
                    </button>
                );
            case "waiting_pickup":
                return (
                    <button
                        className="order-btn deliver"
                        onClick={() => handleStatusUpdate("delivered")}
                        disabled={loading}
                    >
                        {loading ? "Đang cập nhật..." : "Đánh dấu đã giao"}
                    </button>
                );
            default:
                return null;
        }
    };

    return (
        <div className="order-card">
            <div className="order-header">
                <span className="order-id">Mã đơn: {order.orderId}</span>
                <span className={`order-status ${order.status}`}>
                    {order.status.replace("_", " ")}
                </span>
            </div>

            <div className="order-products">
                {order.products.map((item, i) => (
                    <div className="order-item" key={i}>
                        <img
                            src={item.images?.[0]?.url || "/no-image.png"}
                            alt={item.name}
                            className="order-item-img"
                        />
                        <div className="order-item-info">
                            <p className="order-item-name">{item.name}</p>
                            <p className="order-item-price">
                                {item.price.toLocaleString()}₫ × {item.quantity}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="order-footer">
                <div className="order-total">
                    <span>Tổng tiền:</span>
                    <strong>{order.totalAmount.toLocaleString()}₫</strong>
                </div>
                <div className="order-actions">{renderActionButton()}</div>
            </div>
        </div>
    );
}
