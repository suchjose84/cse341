const db = require('../models');
const Inventory = db.inventory;

//get all items in the inventory///
module.exports.getAllItems = async (req, res, next) => {
  try {
    Inventory.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving items.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getItemsByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;
    const items = await Inventory.find({ username: username }).sort({username: 1});
    
    if (!items || items.length === 0) {
      res.status(404).send({ message: 'No items found using that username' });
      return;
    }
    
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving items.'
    });
  }
};

module.exports.getItemsByClassification = async (req, res, next) => {
  try {
    const classification = req.params.classification;
    const items = await Inventory.find({ classification: classification });
    
    if (!items || items.length === 0) {
      res.status(404).send({ message: 'No items found using that classification' });
      return;
    }
    
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving items.'
    });
  }
};

module.exports.addItem = async (req, res) => {
  try {
    const { username, itemName, price, classification, remaining, unit } = req.body;

    // Check if the username exists in the database
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    const newItem = new Inventory({
      username: username,
      itemName: itemName,
      price: price,
      classification: classification,
      remaining: remaining,
      unit: unit
    });

    const savedItem = await newItem.save();
    res.status(201).send({ message: 'Item successfully added', item: savedItem });
  } catch (err) {
    res.status(500).json(err);
  }
};

// module.exports.editUser = async (req, res) => {
//   try {
//     const { username } = req.params;
//     const {
//       username: newUsername,
//       email: newEmail,
//       password,
//       firstName,
//       lastName,
//       birthDate,
//       phone,
//       country,
//       profileImg
//     } = req.body;

//     const { error: emailError } = emailSchema.validate(newEmail);
//     if (emailError) {
//       return res.status(400).send({ message: emailError.details[0].message });
//     }
//     const { error: passwordError } = passwordSchema.validate(password);
//     if (passwordError) {
//       return res.status(400).send({ message: passwordError.details[0].message });
//     }

//     if (!username) {
//       return res.status(400).send({ message: 'Invalid username supplied' });
//     }

//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(404).send({ message: 'User not found' });
//     }

//     // checkif there are existing
//     if (newUsername !== user.username) {
//       const existingUsername = await User.findOne({ username: newUsername });
//       if (existingUsername) {
//         return res.status(409).send({ message: 'Username already exists' });
//       }
//       user.username = newUsername;
//     }
//     // checkif there are existing
//     if (newEmail !== user.email) {
//       const existingEmail = await User.findOne({ email: newEmail });
//       if (existingEmail) {
//         return res.status(409).send({ message: 'Email already exists' });
//       }
//       user.email = newEmail;
//     }

//     if (password) {
//       user.password = password;
//     }

//     // These lines use the logical OR (||) operator to set the values. 
//     //The logical OR operator returns the first truthy value it encounters. In this case, if the value from the 
//     //request body is truthy (not null, undefined, false, 0, or an empty string), it will be assigned to the 
//     //corresponding property of the user object. Otherwise, if the value from the request body is falsy, the 
//     //existing value of the property (user.firstName, user.lastName, etc.) will be retained.

//     user.firstName = firstName || user.firstName;
//     user.lastName = lastName || user.lastName;
//     user.birthDate = birthDate || user.birthDate;
//     user.phone = phone || user.phone;
//     user.country = country || user.country;
//     user.profileImg = profileImg || user.profileImg;

//     await user.save();

//     res.status(200).send(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// module.exports.deleteUser = async (req, res, next) => {
//   try {
//     const username = req.params.username;
//     if (!username) {
//       return res.status(400).send({ message: 'Invalid username supplied' });
//     }
    
//     const result = await User.deleteOne({ username: username });

//     if (result.deletedCount === 0) {
//       return res.status(404).send({ message: 'User not found' });
//     }
    
//     res.status(204).send({message: 'User deleted'});
//   } catch (err) {
//     res.status(500).send({ message: 'Some error occurred while deleting the user', error: err });
//   }
// };

// // module.exports.deleteAll = async (req, res) => {
// //   try {
// //     const result = await User.deleteMany();
// //     if (result.deletedCount > 0) {
// //       res.status(204).send();
// //     } else {
// //       res.status(404).send({ message: 'No users found' });
// //     }
// //   } catch (err) {
// //     res.status(500).json(err || 'Some error occurred while deleting the users.');
// //   }
// // };



