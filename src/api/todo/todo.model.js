const { model, Schema } = require('mongoose');

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    list: { type: Schema.Types.ObjectId, ref: 'List' },
  },

  { timestamps: true }
);

const Todo = model('Todo', todoSchema);

module.exports = Todo;
