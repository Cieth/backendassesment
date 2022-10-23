const Router = require('express');
const { auth } = require('../../utils/auth');
const {
  createListHandler,
  showListsHandler,
  showListHandler,
  deleteListHandler,
} = require('./list.controller');

const router = Router();

router.get('/:listId', auth, showListHandler);
router.get('/', auth, showListsHandler);
router.post('/', auth, createListHandler);
router.delete('/:listId', auth, deleteListHandler);

module.exports = router;
