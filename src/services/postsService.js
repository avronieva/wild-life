const Post = require('../models/Post');

exports.create = (postData) => Post.create(postData);

exports.getAll = () => Post.find().lean();

exports.getOne = (id) => Post.findById(id);

exports.updateOne = (id, postData) => Post.findByIdAndUpdate(id, postData);

exports.deleteOne = (id) => Post.findByIdAndRemove(id);