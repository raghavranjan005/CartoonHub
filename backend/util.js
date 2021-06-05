import jwt from 'jsonwebtoken';
import config from './config';
const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email, 
    },
    config.JWT_SECRET,
    {
      expiresIn: '72h',
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token);
  if (token) {
    const onlyToken = token.slice(7, token.length);
    // console.log(onlyToken);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        // console.log(decode);
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
};

export { getToken, isAuth}
