import { useState } from "react";
import { login } from "../../../../api/auth.js";
import "./login.auth.css"; // file CSS riêng

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // gọi API login
            const res = await login(email, password);
            console.log("Login success:", res.data);

            // lưu token (nếu backend trả token)
            localStorage.setItem("token", res.data.token);

            // chuyển trang sau khi đăng nhập thành công
            window.location.href = "/";
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Đăng nhập thất bại");
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
