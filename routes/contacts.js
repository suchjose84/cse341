const routes = require('express').Router();
const contactsController = require('../controllers/contactsController.js');

// GET /contacts
routes.get('/contacts', contactsController.getAllContacts);

// GET /contacts/:id
routes.get('/contacts/:id', contactsController.getContactById);

// POST /contacts
routes.post('/contacts/', contactsController.addContact);

// PUT /contacts
routes.put('/contacts/:id', contactsController.updateContact);

// DELETE /contacts
routes.delete('/contacts/:id', contactsController.deleteContact);

// DELETE /contacts
routes.delete('/contacts/', contactsController.deleteAll);


module.exports = routes;