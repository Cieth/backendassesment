const { createTodo } = require('./todo.service');
const List = require('../list/list.model');

const createTodoHandler = async (req, res) => {
  const data = req.body;
  const { title, description, link } = data;
  const { listId } = req.params;

  try {
    const list = await List.findById(listId);
    if (!list) throw new Error('Invalid list');

    const newTodo = {
      title,
      description,
      link,
    };
    const Todo = await createTodo(newTodo);
    list.todo.unshift(Todo);
    await list.save({ validateBeforeSave: false });
    return res
      .status(201)
      .json({ message: 'Todo created successfully', data: Todo });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Todo could not be created', error: error.message });
  }
};

module.exports = { createTodoHandler };
