import express from 'express';
import User from '../models/userModel';
import Video from '../models/videoModel';
import bcrypt, { compareSync } from 'bcryptjs';

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

export default router;
