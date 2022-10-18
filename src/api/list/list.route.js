const Router = require('express');
//const { auth } = require('../../utils/auth');
const {
  createListHandler,
  showListsHandler,
  showListHandler,
  deleteListHandler,
} = require('./list.controller');

const router = Router();

router.get('/:listId', showListHandler);
router.get('/', showListsHandler);
router.post('/:userId', createListHandler);
router.delete('/:listId', deleteListHandler);

module.exports = router;
