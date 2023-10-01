// ##################################################################
// #  File Name: response.js                                        #
// #                                                                #
// #  Description:                                                  #
// #  Application response handler,Manage all response              #
// #  This have main Two function SUCCESS and ERROR                 #
// #                                                                #
// #  Ex:- to()                                                     #
// #  const [err, result] = await to(Call Promise function);        #
// #                                                                #
// #  Commented By: Dilshan Chathuranga                             #
// ##################################################################

const chalk = require('chalk');

const { Errors, STRING_ERROR_CODE } = require('./errors');

/**
 * Validate error type (string || number)
 * @param {*} err - Error object
 * If error code is string, call string error code mapper
 * And Return error object
 */
const validateErrorType = (err) => {
  if (typeof err.code === 'string') {
    return STRING_ERROR_CODE[err.code](err);
  }
  return err;
};

module.exports = {

  /**
   * Create succes response
   * @param {Response} res - Response object
   * @param {number} code - Http Sucess code
   * @param {*} data - Final result. object, array ...
   * @return {Object} Return HTTP Response: {
   *  code: 200,
   *  data: (*),
   *  success: true
   * }
   */
  SUCCESS: (res, code, data) => {
    return res.status(code)
      .json({
        code: code,
        data: data,
        success: true
      });
  },

  /**
   * Create error response
   * @param {Response} res - Response object
   * @param {Object} error - Error object
   * @return {Object} Return HTTP Response
   */
  ERROR: (res, error) => {
    try {
      error = error ? error : {};
      error = error.error ? error.error : error;

      if (error && error.code) {
        error = validateErrorType(error);
        const response = Errors[error.code](error);
        return res.status(response.code).json(response);
      }

      return res.status(500).json(Errors[500](error));
    } catch (catchErr) {
      console.log('****', catchErr, error);
      return res.status(400).json(Errors[400](error));
    }
  }
};