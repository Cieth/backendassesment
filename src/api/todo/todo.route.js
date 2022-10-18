const Router = require('express');

const { createTodoHandler } = require('./todo.controller');
const router = Router();

router.post('/:listId', createTodoHandler);

module.exports = router;
