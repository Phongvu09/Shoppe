import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "demo", // hoặc dùng của anh trong .env
  api_key: "123456789",
  api_secret: "xxxxxxxx"
});

console.log("✅ Cloudinary loaded thành công!");
