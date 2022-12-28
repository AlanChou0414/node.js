// import [multer,uuid] modules;
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// file type;
const extMap = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

// use multer function
const fileFilter = (req, file, cb) => {
  // !! to change boolean;
  cb(null, !!extMap[file.mimetype]);
};

// use multer function
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../public/uploads`);
  },
  filename: (req, file, cb) => {
    const filename = uuidv4() + extMap[file.mimetype];
    cb(null, filename);
  },
});

module.exports = multer({ fileFilter, storage });
