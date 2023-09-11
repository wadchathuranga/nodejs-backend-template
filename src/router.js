const express = require('express');
const router = express.Router();

// const HealthRouter = require('./health/router');
const V1Router = require('./v1/router');
// const V2Router = require('./v2/router');

const { initRoute, initSpan, _404, _500 } = require('./init');

const init = initRoute('Awesome: >>>>> NodeJs Backend Service Template is working properly');

// Check route
router.route('/').get(init);

// create span
// router.use(initSpan);

// Check is valid end point
// router.use(Auth.isAuthorized);

// /health
// router.use('/health', HealthRouter);

// /v1
router.use('/v1', V1Router);

// v2
// router.use('/v2', V2Router);

// 404 - Route not found
router.use(_404);

// 500 - Any server error
router.use(_500);

module.exports = router;
