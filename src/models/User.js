const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, 'First name cannot be with less then 3 characters'],
        validate: [/^[a-zA-Z]+$/, 'Username should consist of english letters and digits'],
    },
    lastName: {
        type: String,
        required: true,
        minlength: [5, 'Last name cannot be with less then 5 characters'],
        validate: [/^[a-zA-Z]+$/, 'Username should consist of english letters and digits'],
    },
    email: {
        type: String,
        required: true,
        validate: [/^([A-Za-z]+@[A-Za-z]+\.[A-Za-z]+)$/g, 'Invalid email format!'],
    }, 
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password cannot be with less then 4 characters']
    },
    myPosts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Post',
        }
    ]
});

userSchema.pre('save', function(next) {
    return bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;
            next();
        });
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
})


const User = mongoose.model('User', userSchema);

module.exports = User;