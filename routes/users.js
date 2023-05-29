const routes = require('express').Router();
const usersController = require('../controllers/usersController.js');

// GET /contacts
routes.get('/users', usersController.getAllUsers);

// GET /contacts/:id
routes.get('/users/:userName', usersController.getUser);

// POST /contacts
routes.post('/users', usersController.addUser);

// PUT /contacts
routes.put('/users/:userName', usersController.editUser);

// DELETE /contacts
routes.delete('/users/:userName', usersController.deleteUser);


module.exports = routes;