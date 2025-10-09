import { useState } from "react";
import { loginSeller } from "../../../../api/auth.js";
import { useNavigate } from "react-router-dom";
import "./login.auth.css";

export default function LoginSeller() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginSeller(email, password);
      console.log("Login response:", res);
      alert(JSON.stringify(res, null, 2));


      // Nếu API trả về res.data, ta dùng res.data
      const data = res?.data || res;
      console.log("Extracted data:", data);

      if (!data || !data.accessToken) {
        throw new Error("Phản hồi không hợp lệ từ server.");
      }

      // Lưu token
      localStorage.setItem("accessToken", data.accessToken);

      // Nếu có shopId thì lưu luôn
      if (data.shopId) localStorage.setItem("shopId", data.shopId);

      // Xử lý trạng thái hoàn thiện seller
      const sellerCompletion = data.sellerCompletion || {};

      if (!sellerCompletion.allComplete) {
        if (!sellerCompletion.shopComplete) {
          navigate("/shop-info");
          return;
        }
        if (!sellerCompletion.shippingComplete) {
          navigate("/seller/shipping-form");
          return;
        }
        if (!sellerCompletion.taxComplete) {
          navigate("/seller/tax-form");
          return;
        }
        if (!sellerCompletion.identityComplete) {
          navigate("/seller/identity-form");
          return;
        }
      } else {
        navigate("/seller/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Đăng nhập thất bại. Vui lòng thử lại.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Đăng nhập</h2>

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
