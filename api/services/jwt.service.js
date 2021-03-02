
module.exports = (jwt) => {
  const jwt_service = {
    createToken: async (user) => {
    user.password = null // on cache le password
      return await jwt.sign(user, process.env.SECRET_TOKEN_KEY, { expiresIn: '6h'});
    },
  };

  return jwt_service;
};
