// backend/server.js
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./common/configs/db.js";

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();                      // log "MongoDB connected" như anh đã có
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("Failed to start server:", e);
    process.exit(1);
  }
})();
