const Database = require("./database");

const { TE, to } = require('../../../helper');

module.exports = {

    getEmployees: async () => {
        const response = await Database.getEmployees();
        return response;
    },

    createEmployee: async (employeeData) => {
        const response = await Database.createEmployee(employeeData);
        return response;
    },

    getEmployeeByEmployeeId: async (employeeId) => {
        const [err, response] = await to(Database.getEmployeeByEmployeeId(employeeId));
        if (err) TE(err);
        if (response === null) TE({ code: 404, errmsg: 'Employee not found!' });
        return response;
    },

    // getEmployeeByNICNumber: async (nicNumber) => {
    //     const response = await Database.getEmployeeByEmployeeId(nicNumber);
    //     return response;
    // }
}