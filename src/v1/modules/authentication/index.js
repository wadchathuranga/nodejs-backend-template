const Routes = require('./routes');
const Middleware = require('./middleware');
const Controller = require('./controller');
const Service = require('./service');
const User = require('./schema');

module.exports = {
    UserRoutes: Routes,
    UserMiddleware: Middleware,
    UserController: Controller,
    UserService: Service,
    UserSchema: User,
};