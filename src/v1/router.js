const express = require('express');
const router = express.Router();

// const { AuthenticationRoutes } = require('./modules/authentication');
const { crudRoutes } = require('./modules/crud');

const { initRoute } = require('../init');

const init = initRoute('Awesome: >>>>> NodeJs Backend Service Template [v1] API server is working properly');

router.get('/', init);

// Check is valid end point
// router.use(Auth.isAuthorized);

// router.use('/authentication', AuthenticationRoutes);
router.use('/crud', crudRoutes);

module.exports = router;
