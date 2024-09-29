const multer = require('multer');
const path = require('path');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
 
//Ensure only csv files are uploaded
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.csv') {
    return cb(new Error('Only CSV files are allowed'), false);
  }
  cb(null, true);
};

// Middleware to handle file errors
const handleFileUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: 'Only CSV files are allowed' });
  }
  next();
};

const upload = multer({ storage, fileFilter });

module.exports = { upload ,handleFileUploadError };  // Export multer upload middleware






