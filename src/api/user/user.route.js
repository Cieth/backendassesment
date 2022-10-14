const Router = require('express');
const { signUpHandler } = require('./user.controller');
const router = Router();

router.post('/', signUpHandler);

module.exports = router;
