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

module.exports.editItem = async (req, res) => {
  try {
    const itemId = req.params._id;
    const { price, remaining } = req.body;

    // Validate the itemId as a valid ObjectId//
    // if (!mongoose.Types.ObjectId.isValid(itemId)) {
    //   res.status(400).send({ message: 'Invalid item ID' });
    //   return;
    // }

    // Find the item to be edited
    const item = await Inventory.findById(itemId);
    if (!item) {
      res.status(404).send({ message: 'Item not found' });
      return;
    }

    // Update the item properties
    item.price = price;
    item.remaining = remaining;

    // Save the modified item
    const savedItem = await item.save();

    res.status(200).send({ message: 'Item successfully edited', item: savedItem });
  } catch (err) {
    res.status(500).json(err);
  }
};


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



