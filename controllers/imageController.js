const multer = require('multer');
const bucket = require('../db/db').getBucket();

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp'];
    if (file && allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else if (file) {
      cb(new Error('Not an image! Please upload a valid image file (JPEG, PNG, BMP).'), false);
    } else {
      cb(null, true);
    }
  };
  

exports.upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
});

exports.uploadToGridFS = async (file, filename) => {
    if (!bucket) {
        throw new Error('GridFS bucket not initialized. Make sure to connect first.');
    }
    const uploadStream = bucket.openUploadStream(filename);
    uploadStream.end(file.buffer);
    return new Promise((resolve, reject) => {
        uploadStream.on('finish', (file) => {
            resolve(file);
        });
        uploadStream.on('error', (error) => {
            reject(error);
        });
    });
};