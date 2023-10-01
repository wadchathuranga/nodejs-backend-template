const express = require('express');
const router = express.Router();

const EmployeeController = require('./controller');
const AuthMiddleware = require('../authentication/middleware');

// Protecting the all routes using middleware from the authentication module
router.use(AuthMiddleware.protect);

router.route('/')
    .get(EmployeeController.getEmployees)
    .post(EmployeeController.createEmployee);

router.route('/:employeeId')
    .get(EmployeeController.getEmployeeByEmployeeId);

router.route('/:nicNumber')
    .get(EmployeeController.getEmployeeByEmployeeId);

module.exports = router;
