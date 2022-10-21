const {
  createList,
  showLists,
  showList,
  deleteList,
} = require('./list.service');
const User = require('../user/user.model');

const createListHandler = async (req, res) => {
  const { name } = req.body;
  const userId = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Invalid user');
    }
    const newList = {
      name,
      user: userId,
    };
    const list = await createList(newList);
    user.list.unshift(list);
    await user.save({ validateBeforeSave: false });
    return res
      .status(201)
      .json({ message: 'List created successfully', data: list });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'List could not be created', error: error.message });
  }
};

const showListsHandler = async (req, res) => {
  try {
    const lists = await showLists().populate({
      path: 'todo',
      select: ' title description',
    });
    if (lists.length === 0) {
      return res.status(200).json({ error: 'No lists found' });
    }
    return res.status(200).json({ message: 'lists found', data: lists });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error looking for lists',
      error: error.message,
    });
  }
};

const showListHandler = async (req, res) => {
  const { listId } = req.params;
  try {
    const list = await showList(listId).populate({
      path: 'todo',
      select: ' title description',
    });
    if (!list) {
      throw new Error('List does not exist');
    }
    return res.status(200).json({ message: 'List: ', data: list });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'List could not be found', data: list });
  }
};

const deleteListHandler = async (req, res) => {
  const { listId } = req.params;
  const list = await showList(listId);
  if (!list) {
    return res.status(400).json({ error: 'list is not valid' });
  }
  try {
    await deleteList(listId);
    return res.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'List could not be deleted', error: error.message });
  }
};

module.exports = {
  createListHandler,
  showListHandler,
  showListsHandler,
  deleteListHandler,
};
