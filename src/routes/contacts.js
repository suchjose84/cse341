const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// GET /feed/posts
// router.get('/', contactsController.getData);
// // localhost:3000/contacts/
// module.exports = router;

// GET /contacts
router.get('/contacts', contactsController.getAllContacts);

// GET /contacts/:id
router.get('/contacts/:id', contactsController.getContactById);


module.exports = router;