const dbConfig = require('../config/db.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require('./user.js')(mongoose);
db.inventory = require('./inventory.js')(mongoose);

module.exports = db;

