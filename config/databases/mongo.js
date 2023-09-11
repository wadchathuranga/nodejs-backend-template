const mongoose = require('mongoose');
const chalk = require('chalk');

const { APPLICATION } = require('../config');

const DB_URI = APPLICATION.DB_URI;

const connections = [];

const connect = (database) => {
  const oldConnection = connections.find((c) => c.database === database);

  if (!oldConnection) {
    const dbURL = `${DB_URI.replace('<MONGO_DB_NAME>', database)}`;

    const connection = mongoose.createConnection(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    connections.push({
      database: database,
      dbURL: dbURL,
      conn: connection
    });

    connection.on('connected', () => {
      const success = chalk.bold.green;
      console.log(success('MongoDB Connection is open to', database));
    });

    connection.on('error', (err) => {
      const error = chalk.bold.yellow;
      console.log(error('MongoDB Connection has occurred ' + err + 'error'));
    });

    connection.on('disconnected', () => {
      const disconnected = chalk.bold.red;
      console.log(disconnected('MongoDB Connection is disconnected'));
    });

    process.on('SIGINT', () => {
      connection.close(() => {
        const termination = chalk.bold.magenta;
        console.log(termination('MongoDB connection is disconnected due to application termination'));
        process.exit(0);
      });
    });

    return connection;
  }

  return oldConnection;
};

// To connect all DB at once
const openConnections = () => {
  connect(APPLICATION.MONGO_DB_NAME_V1);
  // connect(APPLICATION.DB_NAME_V2);
};

const disconnect = (database) => {
  return new Promise((resolve, reject) => {
    const connection = connections.find((c) => c.database === database);
    if (connection) {
      connection.conn.close(() => {
        const index = connections.findIndex((c) => c.database === database);
        connections.splice(index, 1);
        return resolve('Disconnected');
      });
    } else {
      return reject('Can not find existing connection');
    }
  });
};

module.exports = {
  connect: connect,
  openConnections: openConnections,
  disconnect: disconnect,
};