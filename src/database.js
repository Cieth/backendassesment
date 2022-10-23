const mongoose = require('mongoose');

let connection;

const connect = async () => {
  if (connection) return;
  const mongoUri = process.env.MONGO_URI;
  mongoose.connect(mongoUri);

  mongoose.connection.once('open', () => {
    console.log('open connection');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected successfull');
  });

  mongoose.connection.on('error', () => {
    console.log('there was an error');
  });

  await mongoose.connect(process.env.MONGO_URI);
};

async function disconnected() {
  if (!connection) return;

  await mongoose.disconnect();
}

module.exports = { connect, disconnected };
