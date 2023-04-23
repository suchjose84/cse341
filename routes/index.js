const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

routes.get('/', lesson1Controller.bugsRoute);
routes.get('/daffy', lesson1Controller.daffyRoute);
routes.get('/yosemite', lesson1Controller.yosemiteRoute);

module.exports = routes;