import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "@/api/auth.js";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { data } = await login(email, password);
      // BE trả { access_token, user }
      if (data?.access_token) localStorage.setItem("access_token", data.access_token);
      nav("/", { replace: true });
    } catch (e) {
      setErr(e?.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[420px] mx-auto px-4 py-10">
      <h1 className="text-xl font-bold mb-4">Đăng nhập</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Email"
               value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Mật khẩu" type="password"
               value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button disabled={loading}
          className="w-full bg-[#ee4d2d] text-white py-2 rounded hover:opacity-90">
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>
      <div className="text-sm mt-3">
        Chưa có tài khoản? <Link to="/register" className="text-[#ee4d2d]">Đăng ký</Link>
      </div>
    </div>
  );
}
