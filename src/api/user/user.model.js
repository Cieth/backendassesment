const { model, Schema, models } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: 'string',
      required: [true, 'the field is required'],
      validate: [
        {
          async validator(value) {
            try {
              const user = await models.User.findOne({ email: value });
              return !user;
            } catch {
              return false;
            }
          },
          message: 'There is an existing user with this email',
        },
      ],
    },
    password: {
      type: 'string',
      required: true,
    },
  },
  { timestamps: true }
);
const User = model('User', userSchema);
module.exports = User;
