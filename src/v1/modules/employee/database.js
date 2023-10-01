const EmployeeSchema = require('./schema');

module.exports = {
    // EmployeeSchema: EmployeeSchema, // if you need you can use schema inside the service file as when uncommen this

    getEmployees: async () =>
        await EmployeeSchema.find(),

    createEmployee: async (data) => {
        const res = new EmployeeSchema(data);
        return await res.save();
    },

    getEmployeeByEmployeeId: async (employeeId) =>
        await EmployeeSchema.findByEmployeeId(employeeId),

    // getEmployeeByNICNumber: async (nicNumber) =>
    //     await EmployeeSchema.findyByNICNumber(nicNumber),
};