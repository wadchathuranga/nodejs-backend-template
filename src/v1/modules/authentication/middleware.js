const jwt = require("jsonwebtoken");
// const util = require('util');

const { ResponseHandler } = require('../../handlers');
const { ERROR } = ResponseHandler;
const { TE } = require('../../../helper');
const { APPLICATION } = require('../../../../config/config');

// handle jwt errors
const validateJWTErrors = (err) => {
    if (typeof err.name == 'string' && err.name == 'TokenExpiredError') {
        TE({ code: 40111, errmsg: 'Access token expired!' });
    } else if (typeof err.name == 'string' && err.name == 'JsonWebTokenError') {
        TE({ code: 40112, errmsg: 'Access token invalid!' });
    }
};

module.exports = {
    // route protecting
    protect: async (req, res, next) => {
        try {
            const reqToken = req.headers.authorization
            let token;
            if (reqToken && reqToken.startsWith('Bearer')) {
                token = reqToken.split(' ')[1];
            }
            if (!token) TE({ code: 40110, errmsg: 'Access token not found!' });

            // validate the token
            let decodedToken;
            jwt.verify(token, APPLICATION.JWT_SECRET_STR, (err, decoded) => {
                // handle jwt error
                if (err) {
                    validateJWTErrors(err);
                } else {
                    decodedToken = decoded;
                }
            });
            req.user = decodedToken.userInfo;
            next();
        } catch (error) {
            ERROR(res, error);
        }
    },

    // validate userId and password
    validateLoginDetails: async (req, res, next) => {
        try {
            const { userId, password } = req.body;
            if (!userId) { TE({ code: 400, errmsg: 'userId required!' }) };
            if (!password) { TE({ code: 400, errmsg: 'password required!' }) };
            next();
        } catch (error) {
            ERROR(res, error);
        }
    },
}