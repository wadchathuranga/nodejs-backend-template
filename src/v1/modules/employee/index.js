const Routes = require('./routes');
const Employee = require('./schema');
// const Middleware = require('./middleware');
const Controller = require('./controller');
const Service = require('./service');

module.exports = {
    EmployeeRoutes: Routes,
    // EmployeeMiddleware: Middleware,
    EmployeeController: Controller,
    EmployeeService: Service,
    EmployeeSchema: Employee,
};