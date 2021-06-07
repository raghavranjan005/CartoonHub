import express from 'express';
import multerS3 from 'multer-s3';
import multer from 'multer';
import aws from 'aws-sdk';
import config from '../config';
import { isAuth } from '../util';
import Video from '../models/videoModel'
import User from '../models/userModel';


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

router.post('/s3-2', uploadS3.single('image'), (req, res) => {
  return res.send(req.file.location);
});



router.post('/',isAuth, async (req, res) => {

    try {

      const uploadVideo = new Video({
        title:req.body.title,
        videoURL:req.body.video,
        description:req.body.description,
        thumbnail:req.body.thumbnail,
        user:req.user._id
      });

      const newVideo = await uploadVideo.save();
      if (newVideo) {
        const user = await User.findById(req.user._id)
        const userVideos = user.videos;
        userVideos.push(newVideo._id);
        await user.save();

      return res
        .status(200)
        .send({ message: 'New Video Uploaded', data: newVideo });
    }
    return res.status(404).send({ message: ' Error in uploading Video.' });
      
    } catch (error) {
      res.send(error);
    }
      
    
  });
  

  export default router;