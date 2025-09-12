import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoDb_url = process.env.MONGODB_URL;

        if (!mongoDb_url) {
            throw new Error("❌ MONGODB_URL chưa được cấu hình trong .env");
        }

        await mongoose.connect(mongoDb_url);

        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ Can't connect to MongoDB:", err.message);
        process.exit(1); // dừng server nếu không kết nối được
    }
};

export default connectDB;
