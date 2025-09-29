import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Đường dẫn import sửa lại (không cần ../backend nữa)
import userRoutes from "./controllers/users/users.router.js";
import productRoutes from "./controllers/products/products.router.js";
import shipRoutes from "./controllers/ship/shipping.router.js";
import authRouter from "./controllers/auth/auth.router.js";
import shopRouters from "./controllers/shopInformation/shop.router.js";
import taxRouters from "./controllers/tax/tax.router.js";
import identityRouters from "./controllers/Identity/identity.router.js";

const app = express();

// Middlewares cơ bản
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // <— CHỈNH DÒNG NÀY
app.use(express.json({ limit: "1mb" }));

// Rate limit cho toàn bộ /api
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use("/api", limiter);

// Mount routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/shipping", shipRoutes);
app.use("/api/auth", authRouter);
app.use("/api/shop", shopRouters);
app.use("/api/tax", taxRouters)
app.use("/api/identity", identityRouters)

// Health check
app.get("/api/health", (req, res) => res.json({ ok: 1, ts: Date.now() }));
// 404
app.get("/api/health", (req, res) => {
  res.json({ ok: 1, ts: Date.now() });
});
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler cuối cùng
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
});

export default app;
