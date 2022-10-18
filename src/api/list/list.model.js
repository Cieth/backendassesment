const { model, Schema } = require('mongoose');

const listSchema = new Schema(
  {
    name: String,
    todo: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const List = model('List', listSchema);

module.exports = List;
