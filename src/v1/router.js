const express = require('express');
const router = express.Router();

// const Auth = require('./modules/authentication/middleware')

const { UserRoutes } = require('./modules/authentication');
const { EmployeeRoutes } = require('./modules/employee');

const { initRoute } = require('../init');

const init = initRoute('Awesome: >>>>> NodeJs Backend Service Template [v1] API server is working properly');

router.get('/', init);

// Check is valid end point
// router.use(Auth.protect);

router.use('/authentication', UserRoutes);
router.use('/employees', EmployeeRoutes);

module.exports = router;
