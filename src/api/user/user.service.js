const User = require('./user.model');

const signUp = (user, encPassword) => {
  return User.create({ ...user, password: encPassword });
};

const signIn = (user, password) => {};

module.exports = { signUp };
