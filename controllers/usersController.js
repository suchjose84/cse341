const mongodb = require('../db/connect');
const {
  ObjectId
} = require('mongodb');

//get all user data
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await mongodb.getDb().db('eggsandmore').collection('users').find().toArray();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }

};
//get 1 user
exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await mongodb.getDb().db('eggsandmore').collection('users').findOne({
      _id: new ObjectId(userId)
    });
    if (!user) {
      return res.status(404).json({
        message: 'Contact not found'
      });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
//create 1 user
exports.addUser = async (req, res, next) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      birthDate: req.body.birthDate,
      phone: req.body.phone,
      country: req.body.country,
      profileImg: req.body.profileImg

    };
    const result = await mongodb.getDb().db('eggsandmore').collection('users').insertOne(contact);
    res.status(201).json({
      id: result.insertedId
    });
  } catch (error) {
    next(error);
  }
};