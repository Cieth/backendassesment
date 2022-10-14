const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user.model');
const { signUp } = require('./user.service');

const signUpHandler = async (req, res) => {
  const userData = req.body;
  const { email, password } = userData;
  try {
    const existingUser = await User.find({ email });
    if (!existingUser) {
      throw new Error('User already exists');
    }
    const encodePassword = await bcrypt.hash(password, 8);
    const user = await signUp(userData, encodePassword);
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
    });
    return res
      .status(201)
      .json({ message: 'User created successfully', data: { user, token } });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error creating user', error: error });
  }
};

module.exports = { signUpHandler };
