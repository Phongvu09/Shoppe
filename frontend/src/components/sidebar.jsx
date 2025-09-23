import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
    const [openMenu, setOpenMenu] = useState(null);
    const location = useLocation();

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <nav className="sidebar">
            <h2 className="logo">Seller Panel</h2>
            <ul className="menu">
                {/* Vận chuyển */}
                <li>
                    <button
                        className={openMenu === "shipping" ? "active" : ""}
                        onClick={() => toggleMenu("shipping")}
                    >
                        Vận chuyển
                    </button>
                    <ul className={`submenu ${openMenu === "shipping" ? "show" : ""}`}>
                        <li>
                            <Link
                                to="/shipping-form"
                                className={location.pathname === "/shipping-form" ? "active" : ""}
                            >
                                Cài đặt vận chuyển
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/shop-info"
                                className={location.pathname === "/shop-info" ? "active" : ""}
                            >
                                Địa chỉ lấy hàng
                            </Link>
                        </li>
                    </ul>
                </li>

                {/* Quản lý đơn hàng */}
                <li>
                    <button
                        className={openMenu === "orders" ? "active" : ""}
                        onClick={() => toggleMenu("orders")}
                    >
                        Quản lý đơn hàng
                    </button>
                    <ul className={`submenu ${openMenu === "orders" ? "show" : ""}`}>
                        <li>
                            <Link
                                to="/orders/pending"
                                className={location.pathname === "/orders/pending" ? "active" : ""}
                            >
                                Đơn chờ xử lý
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/orders/shipped"
                                className={location.pathname === "/orders/shipped" ? "active" : ""}
                            >
                                Đơn đã gửi
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/orders/completed"
                                className={location.pathname === "/orders/completed" ? "active" : ""}
                            >
                                Đơn hoàn thành
                            </Link>
                        </li>
                    </ul>
                </li>

                {/* Quản lý sản phẩm */}
                <li>
                    <button
                        className={openMenu === "products" ? "active" : ""}
                        onClick={() => toggleMenu("products")}
                    >
                        Quản lý sản phẩm
                    </button>
                    <ul className={`submenu ${openMenu === "products" ? "show" : ""}`}>
                        <li>
                            <Link
                                to="/seller/product/info"
                                className={location.pathname === "/seller/product/info" ? "active" : ""}
                            >
                                Thêm sản phẩm
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/products/list"
                                className={location.pathname === "/products/list" ? "active" : ""}
                            >
                                Danh sách sản phẩm
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/products/reviews"
                                className={location.pathname === "/products/reviews" ? "active" : ""}
                            >
                                Đánh giá sản phẩm
                            </Link>
                        </li>
                    </ul>
                </li>

                {/* Chăm sóc khách hàng */}
                <li>
                    <button
                        className={openMenu === "support" ? "active" : ""}
                        onClick={() => toggleMenu("support")}
                    >
                        Chăm sóc khách hàng
                    </button>
                    <ul className={`submenu ${openMenu === "support" ? "show" : ""}`}>
                        <li>
                            <Link
                                to="/support/messages"
                                className={location.pathname === "/support/messages" ? "active" : ""}
                            >
                                Tin nhắn
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/support/feedback"
                                className={location.pathname === "/support/feedback" ? "active" : ""}
                            >
                                Phản hồi
                            </Link>
                        </li>
                    </ul>
                </li>

                {/* Dữ liệu */}
                <li>
                    <button
                        className={openMenu === "analytics" ? "active" : ""}
                        onClick={() => toggleMenu("analytics")}
                    >
                        Dữ liệu
                    </button>
                    <ul className={`submenu ${openMenu === "analytics" ? "show" : ""}`}>
                        <li>
                            <Link
                                to="/analytics/sales"
                                className={location.pathname === "/analytics/sales" ? "active" : ""}
                            >
                                Doanh thu
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/analytics/customers"
                                className={location.pathname === "/analytics/customers" ? "active" : ""}
                            >
                                Khách hàng
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}
