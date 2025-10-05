import Sidebar from "./sidebar.jsx";
import "./SellerLayout.css";

export default function SellerLayout({ children }) {
    return (
        <div className="seller-layout">
            <Sidebar />
            <main className="seller-content">{children}</main>
        </div>
    );
}