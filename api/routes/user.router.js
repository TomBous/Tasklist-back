const verifyToken = require('../middleware/cookie.validation')

module.exports = (express, controllers) => {
  const router = express.Router();

  router
    .route("/users")
    .get(verifyToken, controllers.user.findAll)
    .post(controllers.user.register);

  router.post('/login', controllers.user.login);

  return router;
};
