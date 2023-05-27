const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

//get all contacts in db
exports.getAllContacts = async (req, res, next) => {
  const contacts = await mongodb.getDb().db('contacts').collection('contacts').find().toArray();
  res.status(200).json(contacts);

};
//get 1 contact by its id
exports.getContactById = async (req, res, next) => {
  const contactId = req.params.id;
  try {
    const contact = await mongodb.getDb().db('contacts').collection('contacts').findOne({ _id: new ObjectId(contactId) });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};
//Add 1 contact
exports.addContact = async (req, res, next) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db('contacts').collection('contacts').insertOne(contact);
  res.status(201).json({ id: result.insertedId });
};

//Update 1 contact
exports.updateContact = async (req, res, next) => {
  const contactId = req.params.id; // extract the contact id from the URL params
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db('contacts').collection('contacts').updateOne(
    { _id: new ObjectId(contactId) }, // filter by contact id
    { $set: contact } // update with the new contact data
  );
  res.status(200).json({ id: result.insertedId });
};

//Update 1 contact
exports.deleteContact = async (req, res, next) => {
  const contactId = req.params.id; // extract the contact id from the URL params
  const result = await mongodb.getDb().db('contacts').collection('contacts').deleteOne(
    { _id: new ObjectId(contactId) }); // filter by contact id
  res.status(204).send();
};



