// backend/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Import routers
import productRoutes from "./controllers/products/products.router.js";
import shipRoutes from "./controllers/ship/shipping.router.js";
import authRouter from "./controllers/auth/auth.router.js";
import shopRouters from "./controllers/shopInformation/shop.router.js";
import taxRouters from "./controllers/tax/tax.router.js";
import identityRouters from "./controllers/Identity/identity.router.js";
import orderRouter from "./controllers/orders/orders.router.js";

const app = express();

// ---------- Middleware cơ bản ----------
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ---------- Rate limit ----------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use("/api", limiter);

// ---------- Mount routes ----------
app.use("/api/auth", authRouter); // ✅ Auth hợp nhất cho cả user & seller
app.use("/api/product", productRoutes);
app.use("/api/shipping", shipRoutes);
app.use("/api/shop", shopRouters);
app.use("/api/tax", taxRouters);
app.use("/api/identity", identityRouters);
app.use("/api/order", orderRouter);

// ---------- Health check ----------
app.get("/api/health", (req, res) => {
  res.json({ ok: 1, ts: Date.now() });
});

// ---------- 404 ----------
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// ---------- Error handler ----------
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

export default app;
