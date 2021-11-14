const mongoose = require('mongoose');

const {DB_CONNECTION_STR} = require('../constants');

exports.initDb = function() {
    return mongoose.connect(DB_CONNECTION_STR);
}