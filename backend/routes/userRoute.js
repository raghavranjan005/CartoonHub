import express from 'express';
import User from '../models/userModel';
import Video from '../models/videoModel';
import bcrypt, { compareSync } from 'bcryptjs';
import { getToken, isAuth } from '../util';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
  
          const registerUser = await User.findOne({
            email: req.body.email,
          });
          if(!registerUser){
            const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 8),
              image: req.body.image,
            });
  
          const newUser = await user.save();
  
      if (newUser) {
        return res.send({
          flag:true,
        });
      } else {
        return res.status(401).send({ message: 'Invalid User Data.' });
      }
      }
      else {
      return res.status(401).send({ message: 'User Email-Id Already Exist' });
      }
      
    } catch (error) {
      return res.send(error);
    }
          
  });



  router.post('/signin', async (req, res) => {

    try {
    
        const signinUser = await User.findOne({ email: req.body.email });
        if (signinUser) {
          if (bcrypt.compareSync(req.body.password, signinUser.password)) {
          
            return res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            image: signinUser.image,
            token: getToken(signinUser),
            });
          }
        }
          return res.status(401).send({ message: 'Invalid Email or Password.' });
      
    } catch (error) {
        return res.send(error);
    }
      
    });



    router.get('/myvideo',isAuth, async(req,res)=>{
      try {
        
        const user = await User.findById(req.user._id).populate('videos');
        if(user)
        {
          const myVideos = user.videos;
          return res.send(myVideos);
        }
        else
          return res.status(404).send({message:"No Video Found"});
      } catch (error) {
       return  res.send(error)
      }
    })

    router.get('/likedvideo',isAuth, async(req,res)=>{
      try {
        const user = await User.findById(req.user._id).populate('likedVideos');
        if(user)
        {
          const likedVideos = user.likedVideos;
          return res.send(likedVideos);
        }
        else
          return res.status(404).send({message:"No Video Found"});
      } catch (error) {
       return  res.send(error)
      }
    })
    

export default router;
