// backend/server.js
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./common/configs/db.js";

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    console.log("→ Connecting MongoDB...");
    await connectDB();
    console.log("✓ MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("✗ Failed to start server:", err?.message || err);
    process.exit(1);
  }
})();
