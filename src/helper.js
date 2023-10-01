// ##################################################################
// #  File Name: helper.js                                          #
// #                                                                #
// #  Description: core helper functions for every versions         #
// #                                                                #
// #  Commented By: Lasantha Lakmal                                 #
// ##################################################################

/**
 * Convert promise call result to array
 * @param {Promise} promise - promise object
 * 
 * @returns {[]} Return [err, data] array
 */
const to = (promise) => {
    return promise
        .then(data => {
            return [null, data];
        })
        .catch(err =>
            [err]
        );
};

/**
 * Throw error and if isLog is true, create a log
 * @param {*} err - Any kind of error
 * @param {boolean} isLog - Error log or not
 */
const TE = (err, isLog = true) => {
    if (isLog) {
        console.log(err);
    }
    throw err;
};

module.exports = {
    to: to,
    TE: TE,
};