// middlewares/multer.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'excelUploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir); // Temporary upload location
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExt = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
    }
});

// File filter to allow only Excel files
const fileFilter = (req, file, cb) => {
    const allowedTypes = /xlsx|xls/;
    const allowedMimeTypes = /application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedMimeTypes.test(file.mimetype);
    console.log(mimetype,"extnameextname",extname)

    if (extname ) {
        return cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only Excel files are allowed.'));
    }
};

// Create the multer instance with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5 MB
});

export default upload;
