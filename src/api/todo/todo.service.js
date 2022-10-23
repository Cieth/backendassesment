const Todo = require('./todo.model');

const createTodo = (body) => {
  return Todo.create(body);
};

module.exports = { createTodo };
