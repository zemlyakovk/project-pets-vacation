const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log('Destination');
    cb(null, 'public/images')
  },
  filename(req, file, cb) {
    console.log('MULTERFULE===>', file);
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

module.exports = multer({ storage });
