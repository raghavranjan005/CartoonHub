import express from 'express';
import User from '../models/userModel';
import Video from '../models/videoModel';
import bcrypt, { compareSync } from 'bcryptjs';
import { isAuth } from '../util';

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
          const video = await Video.findById(req.params.id).populate("user");
          if (video) {
            video.views = video.views + 1;
            await video.save();
            return res.send(video);
          } else {
            return res.status(404).send({ message: 'Video Not Found.' });
          } 
    } catch (error) {
      return res.send(error)
    }
  
  });

  router.put('/like',isAuth, async (req, res) => {
    try {
          const video = await Video.findOne({ _id: req.body.videoId });
          if (video) {
            video.likes = video.likes + 1;
            const updatedVideo = await video.save();

            const user = await User.findById(req.user._id)
            const userLikedVideos = user.likedVideos;
            userLikedVideos.push(updatedVideo._id);
            await user.save();
            const updatedLikes = updatedVideo.likes
            return res.send({updatedLikes});
          } else {
            return res.status(404).send({ message: 'Video Not Found.' });
          } 
    } catch (error) {
      return res.send(error)
    }
  
  });

  router.put('/dislike', isAuth, async (req, res) => {
    try {
          const video = await Video.findOne({ _id: req.body.videoId });
          if (video) {
            video.dislikes = video.dislikes + 1;
            const updated = await video.save();
            const TotaldisLikes = updated.dislikes
            return res.send({TotaldisLikes});
          } else {
            return res.status(404).send({ message: 'Video Not Found.' });
          } 
    } catch (error) {
      return res.send(error)
    }
  
  });

  router.post('/addcomment', isAuth, async (req, res) => {
  
    try {
      const video = await Video.findById(req.body.videoId);
      if(video) {
        const user = await User.findById(req.user._id)
        const comment = {
          name: req.user.name,
          comment: req.body.comment,
          userImage:user.image,
        };
        video.comments.push(comment);
        const updatedVideo = await video.save();
        return res.status(201).send({
          data: updatedVideo,
          message: 'Coomment saved successfully.',
        });
        } else {
          return res.status(404).send({ message: 'Video Not Found' });
        }
      
    } catch (error) {
      return res.send(error);
    }
    
  });

    

export default router;
