const Router = require('express');
const { auth } = require('../../utils/auth');
const {
  signUpHandler,
  signInHandler,
  listOfUsersHandler,
} = require('./user.controller');
const router = Router();

router.post('/signup', signUpHandler);
router.post('/login', signInHandler);
router.get('/', auth, listOfUsersHandler);
module.exports = router;
