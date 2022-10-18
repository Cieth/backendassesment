const List = require('./list.model');

const showLists = () => {
  return List.find();
};

const createList = (name) => {
  return List.create(name);
};

const showList = (id) => {
  return List.findById(id);
};

const deleteList = (id) => {
  return List.findByIdAndDelete(id);
};

module.exports = { createList, showLists, showList, deleteList };
