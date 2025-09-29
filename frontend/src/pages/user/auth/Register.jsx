import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "@/api/auth.js";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await register(form);
      nav("/login", { replace: true });
    } catch (e) {
      setErr(e?.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[420px] mx-auto px-4 py-10">
      <h1 className="text-xl font-bold mb-4">Đăng ký</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Tên hiển thị"
               value={form.username} onChange={e=>setForm({...form, username: e.target.value})}/>
        <input className="w-full border rounded px-3 py-2" placeholder="Email"
               value={form.email} onChange={e=>setForm({...form, email: e.target.value})}/>
        <input className="w-full border rounded px-3 py-2" placeholder="Mật khẩu" type="password"
               value={form.password} onChange={e=>setForm({...form, password: e.target.value})}/>
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button disabled={loading}
          className="w-full bg-[#ee4d2d] text-white py-2 rounded hover:opacity-90">
          {loading ? "Đang xử lý..." : "Tạo tài khoản"}
        </button>
      </form>
      <div className="text-sm mt-3">
        Đã có tài khoản? <Link to="/login" className="text-[#ee4d2d]">Đăng nhập</Link>
      </div>
    </div>
  );
}
