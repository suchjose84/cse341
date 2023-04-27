const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// GET /contacts
router.get('/contacts', contactsController.getAllContacts);

// GET /contacts/:id
router.get('/contacts/:id', contactsController.getContactById);


module.exports = router;