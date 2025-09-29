// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const uploadDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, "uploads/"),
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         cb(null, Date.now() + ext);
//     },
// });

// const upload = multer({ storage });
// export default upload;

import multer from "multer";

const storage = multer.memoryStorage(); // không ghi vào disk
const upload = multer({ storage });

export default upload;
