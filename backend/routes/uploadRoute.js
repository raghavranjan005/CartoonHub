import express from 'express';
import multerS3 from 'multer-s3';
import multer from 'multer';
import aws from 'aws-sdk';
import config from '../config';


const router = express.Router();

aws.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
});
const s3 = new aws.S3();
const storageS3 = multerS3({
  s3,
  bucket: 'cartoonhub',
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadS3 = multer({ storage: storageS3 });
router.post('/s3', uploadS3.single('video'), (req, res) => {
  return res.send(req.file.location);
});
export default router;
