const Router = require('express');
const {
  signUpHandler,
  signInHandler,
  listOfUsersHandler,
} = require('./user.controller');
const router = Router();

router.post('/signup', signUpHandler);
router.post('/login', signInHandler);
router.get('/', listOfUsersHandler);
module.exports = router;
