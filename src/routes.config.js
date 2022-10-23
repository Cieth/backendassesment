const user = require('./api/user/user.route');
const lists = require('./api/list/list.route');
const todo = require('./api/todo/todo.route');
function routes(app) {
  app.use('/auth/local', user);
  app.use('/api/favs', lists);
  app.use('/api/todo/', todo);
}

module.exports = routes;
