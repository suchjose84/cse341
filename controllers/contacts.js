const db = require('../models');
const Contact = db.contacts;

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.findAll = (req, res) => {
  /*
    #swagger.description = 'API Key if needed: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */
  console.log(req.header('apiKey'));
  if (req.header('apiKey') === apiKey) {
    Contact.find({},
      {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        favoriteColor: 1,
        birthday: 1
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving temples.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Find a single Temple with an id
exports.findOne = (req, res) => {
  /*
    #swagger.description = 'API Key if needed: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */
  const _id = req.params._id;
  if (req.header('apiKey') === apiKey) {
    Contact.find({ _id: _id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'Could not find contact with id ' + _id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving contact with id =' + _id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

exports.createContact = (req, res) => {
  /*
    #swagger.description = 'API Key if needed: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a contact
  const contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  });
  // Save Temple in the database
  contact
    .save(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Contact.',
      });
    });
};

exports.updateContact = (req, res) => {
  const apiKey = req.query.apiKey; // Extract the API key from the query parameter

  const { id } = req.params;
  const updateData = req.body;

  if (apiKey !== 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N') {
    return res.status(401).send('Unauthorized');
  }

  Contact.findByIdAndUpdate(id, updateData, { new: true })
    .then((updatedContact) => {
      if (!updatedContact) {
        return res.status(404).send('Contact not found');
      }
      res.send(updatedContact);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || 'Error updating the contact',
      });
    });
};

// Update a Temple by the id in the request
// exports.updateContact = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: 'Data to update can not be empty!',
//     });
//   }

//   const id = req.params.id;

//   Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update contact with id=${id}. Maybe contact was not found!`,
//         });
//       } else res.send({ message: 'Contact was updated successfully.' });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Error updating contact with id=' + id,
//       });
//     });
// };


