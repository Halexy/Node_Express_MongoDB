const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');   // Destination folder image
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');     // Replace space with underscore 
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);    // Add timestamp to the filename
  }
});

module.exports = multer({storage: storage}).single('image');    // Export multer and only manage downloads of image files

