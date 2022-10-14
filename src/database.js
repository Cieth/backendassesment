const mongoose = require('mongoose');

const connect = () => {
  const mongoUri = process.env.MONGO_URI;
  mongoose.connect(mongoUri);

  mongoose.connection.once('open', () => {
    console.log('open connection');
  });
  mongoose.connection.on('error', () => {
    console.log('there was an error');
  });
};

module.exports = connect;
