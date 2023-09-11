const { Sequelize, cast } = require('sequelize');
const { APPLICATION } = require('../config');

const HOST = APPLICATION.MYSQL_DB_HOST;
const PORT = APPLICATION.MYSQL_DB_PORT;
const USER = APPLICATION.MYSQL_DB_USER;
const PASSWORD = APPLICATION.MYSQL_DB_PASSWORD;

const connections = [];

const connect = (database) => {
  const oldConnection = connections.find((c) => c.database === database);

  if (oldConnection) return cast(oldConnection.conn, 'Sequelize').val;

  const connection = new Sequelize(database, USER, PASSWORD, {
    host: HOST,
    port: PORT,
    dialect: 'mysql',
    logging: false
  });

  connections.push({
    database: database,
    conn: connection
  });

  connection.authenticate().then(() => {
    console.log(`Connection has been established successfully. ${database}`);
  }).catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  return connection;
};

module.exports = {
  connect: connect,
};