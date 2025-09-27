import multer from "multer"

// để cloudinary xử lý file path
const storage = multer.diskStorage({})
const upload = multer({ storage })

export default upload