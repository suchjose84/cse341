const routes = require('express').Router();
const contacts = require('../controllers/contacts.js');

// GET /contacts
routes.get('/contacts', contacts.findAll);

// GET /contacts/:id
routes.get('/contacts/:id', contacts.findOne);

// POST /contacts
routes.post('/contacts/', contacts.createContact);

// PUT /contacts
routes.put('/contacts/:id', contacts.updateContact);

// DELETE /contacts
routes.delete('/contacts/:id', contacts.deleteContact);

// DELETE /contacts
routes.delete('/contacts/:id', contacts.deleteAllContact);


module.exports = routes;