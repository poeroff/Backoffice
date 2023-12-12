import multer from 'multer';

const storage = multer.memoryStorage();
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploadMiddleware = multer({
    storage,
    filefilter,
});

export default uploadMiddleware;
