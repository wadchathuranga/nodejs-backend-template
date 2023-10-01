const Service = require('./service');

const { ResponseHandler } = require('../../handlers');
const { ERROR, SUCCESS } = ResponseHandler;

module.exports = {

  getEmployees: async (req, res) => {
    try {
      const response = await Service.getEmployees();
      SUCCESS(res, 200, response);
    } catch (error) {
      ERROR(res, error);
    }
  },

  createEmployee: async (req, res) => {
    try {
      const employeeData = req.body;
      const response = await Service.createEmployee(employeeData);
      SUCCESS(res, 201, response);
    } catch (error) {
      ERROR(res, error);
    }
  },

  getEmployeeByEmployeeId: async (req, res) => {
    try {
      const employeeId = req.params.employeeId
      const response = await Service.getEmployeeByEmployeeId(employeeId);
      SUCCESS(res, 200, response);
    } catch (error) {
      ERROR(res, error);
    }
  },

  getEmployeeByNICNumber: async (req, res) => {
    try {
      const nicNumber = req.params.nicNumber
      const response = await Service.getEmployeeByNICNumber(nicNumber);
      SUCCESS(res, 200, response);
    } catch (error) {
      ERROR(res, error);
    }
  }



}