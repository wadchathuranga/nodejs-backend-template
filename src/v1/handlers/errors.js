// ##################################################################
// #  File name: error.js                                           #
// #                                                                #
// #  Description:                                                  #
// #  Mapping custom error code converted below object structure    #
// #                                                                #
// #  Return Error: {                                               #
// #    code: 400,                                                  #
// #    message: 'BAD_REQUEST',                                     #
// #    success: false,                                             #
// #    error: {                                                    #
// #      errmsg: 'Error',                                          #
// #      code: 40001,                                              #
// #      errLogs; []                                               #
// #    }                                                           #
// #  }                                                             #
// #                                                                #
// #  Commented By: Dilshan Chathuranga                             #
// ##################################################################

/**
 * String error code mapper
 * Convert string error code to number error code
 */
const STRING_ERROR_CODE = {
  ACCESS_DENIED: (err) => { err.code = 4011; return err; },
  // err_missing_params: (e) => { e.code = 40002; return e; },
  // err_double_mandatenumber: (e) => { e.code = 40003; return e; },
  // err_no_contract: (e) => { e.code = 40004; return e; },
  // err_invalid_amount: (e) => { e.code = 40006; return e; },
  // err_invalid_sepachars: (e) => { e.code = 40008; return e; },
  // err_no_such_ct: (e) => { e.code = 40009; return e; },
  // err_invalid_domain: (e) => { e.code = 40010; return e; },
  // err_mandatenumber_required: (e) => { e.code = 40011; return e; },
  // err_invalid_iban: (e) => { e.code = 40012; return e; },
  // err_invalid_ct: (e) => { e.code = 40013; return e; },
  // err_contract_signed: (e) => { e.code = 40014; return e; },
  // ECONNRESET: (e) => { e.code = 4007; return e; },
  // err_invalid_input: (e) => { e.code = 40015; return e; },
  // err_invalid_date: (e) => { e.code = 40016; return e; },
  // err_mandate_invalid_state: (e) => { e.code = 40017; return e; },
  // err_invalid_email: (e) => { e.code = 40020; return e; },
  error_system: (err) => { err.code = 5001; return err; }
};

/**
 * @module Object Error mapping Object,
 * This Object have a custom error code and maped to every system errors
 * Ex:-
 * HTTP CODE 400
 * Custom Error code start 4000, 4001, 4002 .... 4009, 40001, ..
 * We cant can't use 4010, because it is 401 series
 */
const Errors = {
  // 400 Series
  400: err => error(400, 'BAD_REQUEST', err),
  // 4001: err => error(400, 'ERR_COMAPNY_ID_REQUIRED', err),
  // 4002: err => error(400, 'ERR_CSV_FILE_NOT_FOUND', err),
  // 4003: err => error(400, 'ERR_CSV_FILE_DATA_EMPTY', err),
  // 4004: err => error(400, 'ERR_CSV_FILE_INVALID', err),
  // 4005: err => error(400, 'ERR_CSV_FILE_TYPE_INVALID', err),
  // 4006: err => error(400, 'ERR_CUSTOMER_ID_INVALID', err),
  // 4007: err => error(400, 'ECONNRESET', err),
  // 40001: err => error(400, 'ERR_REGISTER_VAT_MISSING', err),
  // 40002: err => error(400, 'ERR_MISSING_PARAMS', err),
  // 40003: err => error(400, 'ERR_DOUBLE_MANDATENUMBER', err),
  // 40004: err => error(400, 'ERR_NO_CONTRACT', err),
  // 40005: err => error(400, 'ERR_INVALID_MANDATE_NUMBER', err),
  // 40006: err => error(400, 'ERR_INVALID_AMOUNT', err),
  // 40007: err => error(400, 'ERR_INVALID_MESSAGE', err),
  // 40008: err => error(400, 'ERR_INVALID_SEPACHARS', err),
  // 40009: err => error(400, 'ERR_NO_SUCH_CT', err),
  // 40010: err => error(400, 'ERR_INVALID_DOMAIN', err),
  // 40011: err => error(400, 'ERR_MANDATENUMBER_REQUIRED', err),
  // 40012: err => error(400, 'ERR_INVALID_IBAN', err),
  // 40013: err => error(400, 'ERR_INVALID_CT', err),
  // 40014: err => error(400, 'ERR_CONTRACT_SIGNED', err),
  // 40015: err => error(400, 'ERR_INVALID_INPUT', err),
  // 40016: err => error(400, 'ERR_INVALID_DATE', err),
  // 40017: err => error(400, 'ERR_MANDATE_INVALID_STATE', err),
  // 40018: err => error(400, 'ERR_INVALID_CONTRACT_NUMBER', err),
  // 40019: err => error(400, 'ERR_INVALID_CONTRACT_REQUEST', err),
  // 40020: err => error(400, 'ERR_INVALID_EMAIL', err),
  // 40021: err => error(400, 'ERR_BATCH_CREATION', err),
  // 40022: err => error(400, 'BATCH_NOT_FOUND', err),
  // 40023: err => error(400, 'ERR_RESULT_NOT_FOUND', err),

  // 401 Series
  401: err => error(401, 'UNAUTHORIZED!', err), // ACCESS_DENIED
  40110: err => error(401, 'UNAUTHORIZED!', err), // ACCESS_TOKEN_NOT_FOUND
  40111: err => error(401, 'UNAUTHORIZED!', err), // ACCESS_TOKEN_EXPIRED
  40112: err => error(401, 'UNAUTHORIZED!', err), // ACCESS_TOKEN_INVALID

  // 404 Series
  404: err => error(404, 'NOT_FOUND', err),

  // 500 Series
  500: err => error(500, 'INTERNAL_SERVER_ERROR', err),
  // 5001: err => error(500, 'ERROR_SYSTEM', err),

  // Special Error Series
  11000: ({ code, errmsg }) => error(400, 'DUPLICATION_KEY_ERROR',
    { code, errmsg }),
};

/**
 * Create a structural error object
 * @private
 * @param {number} code - Http error code, ex:- 400,.., 500 
 * @param {string} message - String error code
 * @param {(Object|string)} err - Error Object or string error
 * @param {string} err.code - Custom error code or system error code,
 * @param {string} err.errmsg - Error message
 * @param {[*]} err.errLogs - Error logs list
 * 
 * @returns {Object} Return structural error object (Please check top of file) 
 */
const error = (code, message, err) => {
  // e = e.errmsg ? e : parseError(code, e);
  return {
    code: code,
    message: message,
    ...getError(err)
  };
};

/**
 * System obtained different error formats,Below function Convert that error to above format
 * @private
 * @param {number} code - Http error code, ex:- 400,.., 500 
 * @param {(Object|string)} err - Error Object or string error
 * @param {string} err.code - Custom error code or system error code,
 * @param {string} err.message - Error message
 * @param {[*]} err.errLogs - Error logs list
 * 
 * @returns {Object} Return {
 *  code: 4001,
 *  errmsg: 'test Error',
 * }
 */
// const parseError = (code, err) => {
//   const isErrString = typeof err === 'string';
//   const errmsg = isErrString ? err : err.message;
//   const errLogs = isErrString ? [] : err.errLogs;
//   return {
//     code: err.code ? err.code : code,
//     errmsg: errmsg,
//   };
// };

/**
 * Bind success=false and Return structural error object
 * @private
 * @param {Object} err - Structural error Object
 * @param {string} err.code - Custom error code or system error code,
 * @param {string} err.errmsg - Error message
 * 
 * @returns {Object} Return {
 *  success: false,
 *  error: {
 *    code: 4001,
 *    errmsg: 'test Error',
 *  }
 * }
 */
const getError = err => ({ success: false, error: err });

module.exports = {
  Errors: Errors,
  STRING_ERROR_CODE: STRING_ERROR_CODE,
};