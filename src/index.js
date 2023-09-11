const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// const Tracing = require('@sentry/tracing');
// const Sentry = require('@sentry/node');

const router = require('./router');
// const health = require('./health');
const v1 = require('./v1');
// const v2 = require('./v2');

const { accessHeader } = require('./init');
const { Config } = require('../config');

const { JSON_PARSER, URLENCODED } = Config.BODYPARSER;
// const { SENTRY_DSN, SENTRY_ENVIRONMENT, SENTRY_SAMPLERATE } = Config.APPLICATION;

const app = express();

// Sentry.init({
//   dsn: SENTRY_DSN,
//   environment: SENTRY_ENVIRONMENT,
//   tracesSampleRate: SENTRY_SAMPLERATE,
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//     // enable Express.js middleware tracing
//     new Tracing.Integrations.Express({
//       // to trace all requests to the default router
//       app,
//       // alternatively, you can specify the routes you want to trace:
//       // router: someRouter,
//     }),
//   ],
// });

// // RequestHandler creates a separate execution context using domains, so that every
// // transaction/span/breadcrumb is attached to its own Hub instance
// app.use(Sentry.Handlers.requestHandler());
// // TracingHandler creates a trace for every incoming request
// app.use(Sentry.Handlers.tracingHandler());

// app.use(
//   Sentry.Handlers.errorHandler({
//     shouldHandleError(error) {
//       // Capture all 404 and 500 errors
//       if (error.status >= 400 && error.status <= 503) {
//         return true;
//       }
//       return false;
//     },
//   })
// );


app.use(bodyParser.json(JSON_PARSER));

app.use(bodyParser.urlencoded(URLENCODED));

app.use(cookieParser());

app.use(accessHeader);

// health(app);

v1(app);

// v2(app);

app.use('/', router);

module.exports = app;