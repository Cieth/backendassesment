const Router = require('express');
const { auth } = require('../../utils/auth');
const { createTodoHandler } = require('./todo.controller');
const router = Router();

router.post('/:listId', auth, createTodoHandler);

module.exports = router;
