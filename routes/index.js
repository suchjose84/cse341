const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

routes.get('/', lesson1Controller.yosemiteRoute);
routes.get('/bugs', lesson1Controller.bugsRoute);

module.exports = routes;