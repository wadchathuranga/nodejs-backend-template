// require('module-alias/register');
const { Config } = require('./config');

const { PORT } = Config.APPLICATION;

const app = require('./src');

const onListeningLog = `NBST server is running on port : ${PORT} !!!`;

const onListening = () => console.log(onListeningLog);

app.listen(PORT, onListening());

module.exports = app;