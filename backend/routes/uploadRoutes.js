import path from 'path';
import express from 'express';
import multer from 'multer';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('avatar'), (req, res) => {
  console.log('upload');
  // try {
  //   res.status(200).json({ msg: 'image uploaded successfully' });
  // } catch (error) {
  //   console.error(error.message);
  // }
  try {
    res.send(`/${req.file.path}`);
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
