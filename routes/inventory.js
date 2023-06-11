const routes = require('express').Router();
const inventoryController = require('../controllers/inventoryController.js');
const { requiresAuth } = require('express-openid-connect');

// GET all items in inventory
routes.get('/inventory', requiresAuth(), inventoryController.getAllItems);

// GET items by username
routes.get('/inventory/:username', requiresAuth(), inventoryController.getItemsByUsername);

// GET items by classification
routes.get('/inventory/:classification', requiresAuth(), inventoryController.getItemsByClassification);

// POST create and item in the inventory
routes.post('/inventory', requiresAuth(), inventoryController.addItem);

// PUT update and item
routes.put('/inventory/:id', requiresAuth(), usersController.editItem);

// // DELETE a user
// routes.delete('/users/:username', requiresAuth(), usersController.deleteUser);

module.exports = routes;