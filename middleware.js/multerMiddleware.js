import upload from "../config/multer.js";

export const imageUploadMiddleware = (req, res, next) => {
    const uploader = upload.single("image");
    // Here call the upload middleware of multer
    uploader(req, res, function (err) {
        if (err) {
            res.status(400).send({
                success: false,
                message: err.message,
            });
        }
        // Everything went fine.
        next();
    });
};
