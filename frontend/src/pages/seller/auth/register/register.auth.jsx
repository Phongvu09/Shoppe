import { useState } from "react";
import { register } from "../../../../api/auth.js";
import "./register.auth.css";
import { USER_ROLE } from "../../../../../../backend/common/constant/enum.js";

export default function registerSeller() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }

        setLoading(true);
        try {
            // gọi API đăng ký
            const res = await register(username, email, password, USER_ROLE.SELLER);
            console.log("Register success:", res.data);

            // có thể redirect sang login page
            window.location.href = "/login";
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Đăng ký thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Đăng ký</h2>

                <input
                    type="text"
                    placeholder="Tên người dùng"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

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

                <input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                {error && <p className="error">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Đang đăng ký..." : "Đăng ký"}
                </button>

                <p>
                    Đã có tài khoản? <a href="/login">Đăng nhập</a>
                </p>
            </form>
        </div>
    );
}
