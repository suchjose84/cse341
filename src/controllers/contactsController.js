const mongodb = require('../db/connect');

exports.getAllContacts = async (req, res, next) => {
  const contacts = await mongodb.getDb().db('week2db').collection('contacts').find().toArray();
  res.status(200).json(contacts);

};

const { ObjectId } = require('mongodb');

exports.getContactById = async (req, res, next) => {
  const contactId = req.params.id;
  try {
    const contact = await mongodb.getDb().db('week2db').collection('contacts').findOne({ _id: new ObjectId(contactId) });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};
