const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { Config, Databases, Swagger } = require('../../config');

const { DEFINITION, APIS } = Swagger.SWAGGER;

const { MONGO_DB_NAME_V1 } = Config.APPLICATION;

const options = {
    swaggerDefinition: DEFINITION('v1'),
    apis: [
        ...APIS['V1'].map(module_name => `./src/v1/modules/${module_name}/router.js`),
        ...APIS['V1'].map(module_name => `./src/v1/modules/${module_name}/swagger/*.yaml`),
    ]
};

const swaggerSpec = swaggerJSDoc(options);

// const getAPIJson = (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerSpec);
// };

module.exports = (app) => {

    // app.get('/v1/swagger.json', getAPIJson);

    app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    Databases.Mongo.connect(MONGO_DB_NAME_V1);
};