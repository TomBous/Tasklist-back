const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || '';
  try {
    if (!token) {
      return res.status(401).json('You need to Login')
    }
    const decrypt = await jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    req.user = decrypt
    console.log(req.user)
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

module.exports = verifyToken;