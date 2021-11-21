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