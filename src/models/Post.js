const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [6, 'Title cannot be less than 6 letters'],
    },
    keyword: {
        type: String,
        required: true,
        minlength: [6, 'Keyword cannot be less than 6 letters'],
    },
    location: {
        type: String,
        required: true,
        maxlength: [15, 'Location cannot be more than 15 letters'],
    },
    creationDate: {
        type: String,
        required: true,
        validate: [/^([0-9]{2}\.)([0-9]{2}\.)[0-9]{4}$/g, 'Invalid date format'],
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//i, 'Invalid image url!'],
    },
    description: {
        type: String,
        required: true,
        minlength: [8, 'Description cannot be less than 8 letters'],
    },
    rating: {
        type: Number,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    votes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ]
});

postSchema.method('getVotes', function() {
    return this.votes.map(x => x.email).join(', ');
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;