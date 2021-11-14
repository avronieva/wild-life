const { SECRET } = require('../constants');
const User = require('../models/User');
const { jwtSign } = require('../utils/jwtUtils');

exports.register = (userData) => {
    User.create(userData);
}

exports.login = async ({email, password}) => {
    let user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid username or password');
    }

    let isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Invalid username or password');
    }

    let payload = {
        _id: user._id,
        email: user.email,
        password: user.password
    }

    let token = await jwtSign(payload, SECRET, { expiresIn: '1h' });

    return token;
}