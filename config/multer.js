import multer from "multer";

const storage = multer.memoryStorage();

function isImage(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Please Uplaod Image"));
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB limit (adjust as needed)
    },
    fileFilter: isImage,
});

export default upload;
