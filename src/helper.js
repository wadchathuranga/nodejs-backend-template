// // ##################################################################
// // #  File Name: helper.js                                          #
// // #                                                                #
// // #  Description: core helper functions for every versions         #
// // #                                                                #
// // #  Commented By: Dilshan Chathuranga                             #
// // ##################################################################

// const Sentry = require('@sentry/node');

// const Tracer = require('./tracer');

// const { CUSTOM_CODE } = require('./errors');

// const _spanFinished = (span, response, err) => {
//   if (!span) return;
//   if (err) {
//     const stack = err.stack ? err.stack : null;
//     Tracer.createErrorLog(span, response, stack);
//   } else {
//     Tracer.createLog(span, 'finished', {
//       method: 'success',
//       component: 'helper'
//     });
//   }

//   span.finish();
// };

// /**
//  * Convert promise call result to array
//  * @param {Promise} promise - promise object
//  * 
//  * @returns {[]} Return [err, data] array
//  */
// const to = (promise) => {
//   return promise
//     .then(data => {
//       return [null, data];
//     }).catch(err =>
//       [err]
//     );
// };

// /**
//  * Throw error and if isLog is true, create a log
//  * @param {*} err - Any kind of error
//  * @param {boolean} isLog - Error log or not
//  */
// const TE = (err, isLog = false) => {
//   if (isLog) {
//     console.error(err);
//   }
//   throw err;
// };

// /**
//  * Create succes response
//  * @param {Response} res - Response object
//  * @param {number} code - Http Sucess code
//  * @param {*} data - Final result. object, array ...
//  * @return {Object} Return HTTP Response: {
//  *  code: 200,
//  *  data: (*),
//  *  success: true
//  * }
//  */
// const SUCCESS = (res, codeObj, data, span = null) => {
//   const { hc, code, message } = codeObj;
//   _spanFinished(span);
//   let response = CUSTOM_CODE._200(data);
//   if (hc && code && message) {
//     response = CUSTOM_CODE[`_${hc}`](data, codeObj);
//   }
//   res.status(response.httpCode).json(response);
//   return response;
// };

// /**
//  * Create error response
//  * @param {Response} res - Response object
//  * @param {Object} error - Error object
//  * @return {Object} Return HTTP Response
//  */
// const ERROR = (res, err, span = null) => {
//   try {
//     let response = CUSTOM_CODE._500(err);
//     if (err && err.hc && err.message) {
//       response = CUSTOM_CODE[`_${err.hc}`](err);
//     }
//     _spanFinished(span, response, err);
//     if (response.httpCode === 500) {
//       Sentry.captureException(err);
//     }
//     return res.status(response.httpCode).json(response);
//   } catch (catchErr) {
//     console.log('****', catchErr);
//     Sentry.captureException(err);
//     const response = CUSTOM_CODE._400(err);
//     _spanFinished(span, response, catchErr);
//     return res.status(response.httpCode).json(response);
//   }
// };

// /**
//  * @module helper
//  */
// module.exports = {
//   to,
//   TE,
//   SUCCESS,
//   ERROR
// };