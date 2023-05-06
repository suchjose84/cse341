const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// GET /contacts
router.get('/contacts', contactsController.getAllContacts);

// GET /contacts/:id
router.get('/contacts/:id', contactsController.getContactById);

// POST /contacts
router.post('/contacts', contactsController.addContact);

// PUT /contacts
router.put('/contacts/:id', contactsController.updateContact);

// DELETE /contacts
router.delete('/contacts/:id', contactsController.deleteContact);


module.exports = router;