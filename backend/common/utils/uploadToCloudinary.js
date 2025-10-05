// // common/utils/uploadToCloudinary.js
// import multer from "multer";
// import fs from "fs";
// import path from "path";
// import cloudinary from "../configs/cloudinary.js";

// // Tạo thư mục uploads nếu chưa tồn tại
// const uploadDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// // Cấu hình Multer lưu tạm vào folder uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, uploadDir),
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         cb(null, Date.now() + ext);
//     },
// });

// export const upload = multer({
//     storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024, // 5MB/file
//     },
// });

// // Middleware upload lên Cloudinary
// export const uploadToCloudinary = async (req, res, next) => {
//     if (!req.files || req.files.length === 0) return next();

//     try {
//         const images = [];

//         // Upload từng file tuần tự để tránh timeout
//         for (const file of req.files) {
//             const result = await cloudinary.uploader.upload(path.resolve(file.path), {
//                 folder: "products",
//             });

//             images.push({
//                 url: result.secure_url,
//                 public_id: result.public_id,
//             });

//             // Xóa file tạm sau khi upload
//             fs.unlinkSync(file.path);
//         }

//         req.body.images = images;
//         next();
//     } catch (err) {
//         console.error("Cloudinary upload error:", err);
//         next(err);
//     }
// };
// export default uploadToCloudinary