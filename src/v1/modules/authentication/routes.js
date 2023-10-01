const express = require('express');
const router = express.Router();

const UserController = require('./controller');
const UserMiddleware = require('./middleware');


router.route('/create')
    .post(UserController.userSignup);

router.route('/login')
    .post(
        UserMiddleware.validateLoginDetails,
        UserController.userLogin,
    );

module.exports = router;
