// src/pages/user/auth/Register.jsx
import { useState } from "react";
import { register as apiRegister } from "@/api/auth"; // hoặc "../api/auth"
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setLoading(true);
    try {
      // KHÔNG lưu token ở đây
      await apiRegister({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      nav("/login");
    } catch (err) {
      setErrMsg(err?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Đăng ký</h1>

      {errMsg && <p className="text-red-600 mb-3">{errMsg}</p>}

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          name="username"
          placeholder="Tên hiển thị"
          value={form.username}
          onChange={onChange}
          className="border rounded w-full p-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          className="border rounded w-full p-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={onChange}
          className="border rounded w-full p-2"
          minLength={6}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white w-full py-2 rounded disabled:opacity-60"
        >
          {loading ? "Đang tạo..." : "Tạo tài khoản"}
        </button>
      </form>

      <p className="mt-3 text-sm">
        Đã có tài khoản? <Link to="/login" className="text-blue-600">Đăng nhập</Link>
      </p>
    </div>
  );
}
