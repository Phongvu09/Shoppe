import { useState } from "react";
import { login } from "@/api/auth.js";
import "./login.auth.css"; // CSS riêng

export default function LoginSeller() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Gọi API login (hàm login đã return trực tiếp data)
      const res = await login(email, password);
      console.log("Login success:", res);

      // Lấy đúng giá trị BE trả
      const token = res?.data?.accessToken;
      const user = res?.data?.user;

      if (!token || !user) throw new Error("Email hoặc mật khẩu không đúng");

      // Lưu token và user vào localStorage
      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Thông báo cập nhật navbar (nếu có)
      window.dispatchEvent(new Event("auth-changed"));

      // Chuyển trang sau khi đăng nhập thành công
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Đăng nhập thất bại, vui lòng thử lại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Đăng nhập Seller</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p>
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
      </form>
    </div>
  );
}
