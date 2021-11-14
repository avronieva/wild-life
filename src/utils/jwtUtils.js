const jwt = require('jsonwebtoken');
const util = require('util');

exports.jwtSign = util.promisify(jwt.sign);
exports.jwtVerify = util.promisify(jwt.verify);