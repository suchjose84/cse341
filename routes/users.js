const routes = require('express').Router();
const usersController = require('../controllers/usersController.js');

// GET /contacts
routes.get('/users', usersController.getAllUsers);

// GET /contacts/:id
routes.get('/users/:id', usersController.getUserById);

// POST /contacts
routes.post('/users/', usersController.addUser);

// // PUT /contacts
// routes.put('/contacts/:id', contactsController.updateContact);

// // DELETE /contacts
// routes.delete('/contacts/:id', contactsController.deleteContact);

// // DELETE /contacts
// routes.delete('/contacts/', contactsController.deleteAll);


module.exports = routes;