const postsService = require('../services/postsService');

exports.isAuthor = async function (req, res, next) {
    let post = await postsService.getOne(req.params.postId);

    if (post.author == req.user._id) {
        req.post = post;
        next();
    } else {
        res.redirect('/'); 
    }
}

exports.isNotAuthor = async function (req, res, next) {
    let post = await postsService.getOne(req.params.postId);

    if (post.author != req.user._id) {
        next();
    } else {
        res.redirect('/');
    }
}