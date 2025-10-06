// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import api from "@/api/api.js";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  // ✅ Lấy user từ token hiện tại (backend /api/auth/me)
  const fetchMe = useCallback(async () => {
    try {
      const res = await api.get("/api/auth/me");
      const me = res?.data?.user || res?.data?.data?.user || null;
      if (me) {
        setUser(me);
        localStorage.setItem("user", JSON.stringify(me));
      }
    } catch {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, []);

  useEffect(() => {
    fetchMe(); // chạy lần đầu
    const onAuthChanged = () => fetchMe();
    window.addEventListener("auth-changed", onAuthChanged);
    window.addEventListener("storage", onAuthChanged);
    return () => {
      window.removeEventListener("auth-changed", onAuthChanged);
      window.removeEventListener("storage", onAuthChanged);
    };
  }, [fetchMe]);

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout").catch(() => {});
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      setUser(null);
      window.dispatchEvent(new Event("auth-changed"));
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 shadow">
      {/* Thanh top */}
      <div className="bg-[#ee4d2d] text-white/90 text-[12.5px]">
        <div className="max-w-[1200px] mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#!" className="hover:underline">Kênh Người Bán</a>
            <span className="opacity-60">|</span>
            <a href="#!" className="hover:underline">Tải ứng dụng</a>
            <span className="opacity-60">|</span>
            <a href="#!" className="hover:underline">Kết nối</a>
            <span className="-mt-0.5">🅕</span>
            <span className="-mt-0.5">🅘</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#!" className="hover:underline flex items-center gap-1">🔔 Thông Báo</a>
            <a href="#!" className="hover:underline flex items-center gap-1">❓ Hỗ Trợ</a>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="font-medium">👤 {user.username || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white/10 hover:bg-white/20 text-white px-2 py-[2px] rounded text-xs"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="hover:underline">Đăng Nhập</Link>
                <span className="opacity-60">/</span>
                <Link to="/register" className="hover:underline">Đăng Ký</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Header chính */}
      <div className="bg-[#ee4d2d]">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-white">
            <div className="bg-white text-[#ee4d2d] rounded-md w-9 h-9 grid place-items-center font-bold">S</div>
            <span className="text-2xl font-semibold">Shopee Lite</span>
          </Link>

          {/* Search */}
          <div className="flex-1">
            <div className="flex items-center bg-white rounded-md overflow-hidden">
              <input
                className="flex-1 px-3 py-2 outline-none text-sm"
                placeholder="Tìm sản phẩm…"
              />
              <button className="bg-[#fb5533] text-white px-4 py-2 text-sm hover:opacity-90">
                Tìm
              </button>
            </div>
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="text-white text-xl relative hover:opacity-90"
            title="Giỏ hàng"
          >
            🛒
            <span className="absolute -top-2 -right-2 text-[11px] bg-white text-[#ee4d2d] rounded-full px-1">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
