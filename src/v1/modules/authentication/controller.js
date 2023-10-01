const Service = require('./service');

const { ResponseHandler } = require('../../handlers');
const { ERROR, SUCCESS } = ResponseHandler;

module.exports = {

  userSignup: async (req, res) => {
    try {
      const userData = req.body;
      const response = await Service.userSignup(userData);
      SUCCESS(res, 200, response);
    } catch (error) {
      ERROR(res, error);
    }
  },

  userLogin: async (req, res) => {
    try {
      const userData = req.body;
      const response = await Service.userLogin(userData);
      SUCCESS(res, 200, response);
    } catch (error) {
      ERROR(res, error);
    }
  },



}