import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/api.js";
import { logout } from "@/api/auth.js";

export default function Navbar() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/auth/me");
        setUser(data.user);
      } catch {
        setUser(null);
      }
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ignore nếu BE không có endpoint
    } finally {
      localStorage.removeItem("access_token");
      setUser(null);
      nav("/login");
    }
  };

  const hints = [
    "Áo Thun Nam Form Rộng",
    "Áo Khoác Arsenal",
    "Mì Ramen Hàn Quốc",
    "Ví Nữ Mini",
    "Giày ZR Xuất Xịn",
    "Máy Hút Bụi Giường Bear",
    "Aesir",
  ];

  return (
    <nav className="sticky top-0 z-50 shadow">
      {/* TOP BAR */}
      <div className="bg-[#ee4d2d] text-white/90 text-[12.5px]">
        <div className="max-w-[1200px] mx-auto px-4 py-2 flex items-center justify-between">
          {/* left links */}
          <div className="flex items-center gap-3">
            <a className="hover:underline" href="#!">Kênh Người Bán</a>
            <span className="opacity-60">|</span>
            <a className="hover:underline" href="#!">Tải ứng dụng</a>
            <span className="opacity-60">|</span>
            <a className="hover:underline" href="#!">Kết nối</a>
            <span className="-mt-0.5">🅕</span>
            <span className="-mt-0.5">🅘</span>
          </div>

          {/* right actions */}
          <div className="flex items-center gap-4">
            <a className="hover:underline flex items-center gap-1" href="#!">🔔 Thông Báo</a>
            <a className="hover:underline flex items-center gap-1" href="#!">❓ Hỗ Trợ</a>

            {/* language dropdown */}
            <div className="relative group">
              <button className="hover:underline flex items-center gap-1" type="button">
                🌐 Tiếng Việt <span className="opacity-80">▾</span>
              </button>
              <div className="hidden group-hover:block absolute right-0 mt-2 bg-white text-gray-700 rounded shadow w-36 text-sm">
                <button className="block w-full text-left px-3 py-2 hover:bg-gray-50">Tiếng Việt</button>
                <button className="block w-full text-left px-3 py-2 hover:bg-gray-50">English</button>
              </div>
            </div>

            {/* auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="font-medium">👤 {user.username}</span>
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

      {/* MAIN HEADER (gradient) */}
      <div className="bg-gradient-to-r from-[#f53d2d] to-[#ff7337]">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center gap-4">
          {/* logo */}
          <Link to="/" className="flex items-center font-bold text-white text-[26px] tracking-tight">
            <span className="bg-white text-[#ee4d2d] px-2 py-1 rounded mr-2 text-[22px]">S</span>
            Shopee
          </Link>

          {/* search */}
          <div className="flex-1">
            <div className="flex items-center">
              <input
                className="w-full h-[44px] rounded-l px-4 outline-none text-gray-800 text-[14px]"
                placeholder="Ngày Hội Chính Hãng"
              />
              <button
                className="h-[44px] px-5 rounded-r bg-white text-[#ee4d2d] font-semibold"
                type="button"
              >
                🔍
              </button>
            </div>

            {/* search hints */}
            <div className="hidden md:flex gap-4 text-white/90 text-[12.5px] mt-2">
              {hints.map((h) => (
                <a key={h} href="#!" className="hover:underline">{h}</a>
              ))}
            </div>
          </div>

          {/* cart */}
          <Link to="/cart" className="relative text-white text-3xl ml-2">
            🛒
            <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-[11px] px-1 rounded-full">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
