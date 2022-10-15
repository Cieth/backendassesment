const Router = require('express');
const { signUpHandler, signInHandler } = require('./user.controller');
const router = Router();

router.post('/signup', signUpHandler);
router.post('/signin', signInHandler);

module.exports = router;
