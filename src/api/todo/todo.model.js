const { model, Squema } = require('mongoose');

const todoSquema = new Squema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: String,
  },
  { timestamps: true }
);

const Todo = model('Todo', todoSquema);

module.exports = Todo;
