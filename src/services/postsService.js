const Post = require('../models/Post');

exports.create = (postData) => Post.create(postData);

exports.getAll = () => Post.find().lean();

exports.getOne = (id) => Post.findById(id);

exports.updateOne = (id, postData) => Post.findByIdAndUpdate(id, postData);

exports.deleteOne = (id) => Post.findByIdAndRemove(id);

exports.getAllUserPosts = async (userId) => {
    let result = await this.getAll();
    result = result.filter(x => x.author == userId);

    return result;
}

exports.increaseVotes =  async (id, userId) => {
    let post = await this.getOne(id).lean();

    let rating = post.rating;
    rating += 1;

    let votes = post.votes;
    votes.push(userId);

    return Post.findByIdAndUpdate(id, {rating, votes});
}

exports.decreaseVotes =  async (id, userId) => {
    let post = await this.getOne(id).lean();

    let rating = post.rating;
    rating -= 1;

    let votes = post.votes;
    votes.push(userId);

    return Post.findByIdAndUpdate(id, {rating, votes});
}