

import multer from "multer";

const storage = multer.memoryStorage(); // không ghi vào disk
const upload = multer({ storage });

export default upload;
