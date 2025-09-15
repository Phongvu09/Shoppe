import express from "express";
import cors from "cors";
import userRoutes from "../backend/controllers/users/users.router.js";
import productRoutes from "../backend/controllers/products/products.router.js";
import shipRoutes from "../backend/controllers/ship/shipping.router.js"
import authRouter from "../backend/controllers/auth/auth.router.js"
import shopRouters from "../backend/controllers/shopInformation/shop.router.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/shipping", shipRoutes);
app.use("/auth", authRouter);
app.use("/shop", shopRouters);

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: err.message });
});

export default app;
