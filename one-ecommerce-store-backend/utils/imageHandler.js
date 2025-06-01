const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const uploadImagesMiddleware = upload.array('images');

const saveImages = (req) => {
    if (!req.files) return [];
    return req.files.map(file => `/uploads/${file.filename}`);
};

const deleteImages = (imagePaths) => {
    if (!Array.isArray(imagePaths)) return;

    imagePaths.forEach(imagePath => {
        if (typeof imagePath !== 'string' || !imagePath.startsWith('/uploads/')) {
            console.warn(`Skipped unsafe or invalid path: ${imagePath}`);
            return;
        }

        const fullPath = path.join(__dirname, '..', imagePath);
        fs.unlink(fullPath, err => {
            if (err) {
                console.error(`Failed to delete image: ${fullPath}`, err);
            } else {
                console.log(`Deleted image: ${fullPath}`);
            }
        });
    });
};

module.exports = {
    uploadImagesMiddleware,
    saveImages,
    deleteImages
};
