module.exports = (mongoose) => {
    const inventorySchema = mongoose.Schema({
      username: {
        type: String
      },
      itemName: {
        type: String
      },
      price: {
        type: String
      },
      classification: {
        type: String
      },
      remaining: {
        type: String
      },
      unit: {
        type: String
      }
    }, {
      versionKey: false
    }
    );
    return mongoose.model('inventory', inventorySchema);
  };