const dotEnv = require('dotenv');
const chalk = require('chalk');

dotEnv.config();

const terminateServer = () => {
  const termination = chalk.bold.magenta;
  console.log(
    termination('Application terminate due to mismatch environment\n')
  );
  process.exit(0);
};

const ENV_CONFIGURATION = () => {
  try {
    const path = `${APPLICATION.ENV_FILE_PATH}/${APPLICATION.ENV}.json`;
    return require(path);
  } catch (err) {
    console.log(err);

    console.log(`\n********** ENVIRONMENT NOT FOUND **********
      \nPlease follow below step
      \n01. Create development.json, production,json in /config/env/ 
      \n02. Copy sample content below created all files.
      \n03. Change content
      \n\nNote:- Do you want to run/build development environment, only create development.json\n`);

    terminateServer();
  }
};

const API_VERSIONS = process.env.API_VERSIONS.split(' ');

const getMongoDBObject = () => {
  const dbObject = {
    DB_URI: process.env.MONGO_DB_URI
  };

  // add db name according to api version
  API_VERSIONS.forEach(k => {
    const dbKey = `MONGO_DB_NAME_${k}`; // dbKey = DB_NAME_V1
    const dbValue = process.env[dbKey]; // dbValue = db_name_v1
    dbObject[dbKey] = dbValue; // { ..., DB_NAME_V1 = db_name_v1 }
  });
  return dbObject; // { DB_NAME_V1: db_name_v1, DB_URI: <MONGODB_URI> }
};

const APPLICATION = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  ENV: process.env.NODE_ENV,

  APP_NAME: process.env.APP_NAME,
  APP_KEY: process.env.APP_KEY,
  // APP_ENV: process.env.APP_ENV,
  APP_URL: process.env.APP_URL,
  APP_VERSION: process.env.APP_VERSION,

  JWT_SECRET_STR: process.env.JWT_SECRET_STR,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  JWT_COOKIES_EXPIRE: process.env.JWT_COOKIES_EXPIRE,

  API_VERSIONS: API_VERSIONS,

  ENV_FILE_PATH: process.env.ENV_FILE_PATH,

  CLIENT_APP_URL: process.env.CLIENT_APP_URL,

  //   SENTRY_DSN: process.env.SENTRY_DSN,
  //   SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
  //   SENTRY_SAMPLERATE: process.env.SENTRY_SAMPLERATE,

  ...getMongoDBObject()
};


const BODYPARSER = {
  JSON_PARSER: {
    limit: '50mb'
  },
  URLENCODED: {
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  }
};

const ACCESS_HEADERS = {
  ALLOWED_DOMAINS: ENV_CONFIGURATION().ALLOWED_DOMAINS,
  ALLOW_METHODS: ENV_CONFIGURATION().ALLOW_METHODS,
  ALLOW_HEADERS: ENV_CONFIGURATION().ALLOW_HEADERS,
};

// following two deference way to get config

// const AUTHENTICATION = {
//   ...ENV_CONFIGURATION().authentication,
// };
//  OR
// const AUTHENTICATION = ENV_CONFIGURATION().authentication;
// const SETTING = ENV_CONFIGURATION().setting;


module.exports = {
  APPLICATION,
  BODYPARSER,
  ACCESS_HEADERS,
  // AUTHENTICATION,
  // SETTING,
};
