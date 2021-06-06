import express from 'express';
import User from '../models/userModel';
import Video from '../models/videoModel';
import bcrypt, { compareSync } from 'bcryptjs';
import { getToken, isAuth } from '../util';

const router = express.Router();

router.get('/',async(req,res)=>{
    try {
      const videos = await Video.find({}).populate('user');
      if(videos)
        return res.send(videos);
      else
        return res.status(404).send({message:"No Video Found"});
    } catch (error) {
     return  res.send(error)
    }
  })

  router.get('/:id', async (req, res) => {
    try {
          const video = await Video.findOne({ _id: req.params.id });
          if (video) {
            return res.send(video);
          } else {
            return res.status(404).send({ message: 'Video Not Found.' });
          } 
    } catch (error) {
      return res.send(error)
    }
  
  });

    

export default router;
