import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "@/api/auth.js";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await login(form.email.trim(), form.password);

      // Lấy dữ liệu chuẩn từ backend
      const data = res?.data || res || {};
      const token =
        data?.accessToken ||
        data?.data?.accessToken ||
        null;
      const user =
        data?.user ||
        data?.data?.user ||
        null;

      // Nếu backend không trả token => login thất bại
      if (!token || !user) {
        throw new Error("Email hoặc mật khẩu không đúng");
      }

      // Lưu user + token
      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Thông báo cho Navbar cập nhật
      window.dispatchEvent(new Event("auth-changed"));

      // Điều hướng về trang chủ
      alert(`Đăng nhập thành công! Xin chào ${user.username || user.email}`);
      navigate("/");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Đăng nhập thất bại, vui lòng thử lại!";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#ee4d2d]">
          Đăng nhập tài khoản
        </h1>

        {errorMsg && (
          <p className="text-red-600 mb-3 text-center">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-[#ee4d2d]"
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-[#ee4d2d]"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ee4d2d] hover:bg-[#d8431a] text-white py-2 rounded-md transition disabled:opacity-70"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-[#ee4d2d] font-medium hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
