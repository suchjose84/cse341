const routes = require('express').Router();
const inventoryController = require('../controllers/inventoryController.js');
const { requiresAuth } = require('express-openid-connect');

// GET all items in inventory
routes.get('/inventory', requiresAuth(), inventoryController.getAllItems);

// GET items by username
routes.get('/users/inventory/:username', requiresAuth(), inventoryController.getItemsByUsername);

// // POST create user
// routes.post('/users', requiresAuth(), usersController.addUser);

// // PUT update user
// routes.put('/users/:username', requiresAuth(), usersController.editUser);

// // DELETE a user
// routes.delete('/users/:username', requiresAuth(), usersController.deleteUser);

module.exports = routes;