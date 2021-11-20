const router = require('express').Router();

const postsService = require('../services/postsService');

async function isAuthor(req, res, next) {
    let post = await postsService.getOne(req.params.postId);

    if (post.author == req.user._id) {
        res.redirect('/404'); 
    } else {
        next();
    }
}

async function isNotAuthor(req, res, next) {
    let post = await postsService.getOne(req.params.postId);

    if (post.author != req.user._id) {
        res.redirect('/404'); 
    } else {
        next();
    }
}


router.get('/', async (req, res) => {
    let posts = await postsService.getAll();
    res.render('posts/all', {posts});
});

router.get('/create', (req, res) => {
    res.render('posts/create');
});

router.post('/create', async (req, res) => {
    await postsService.create({ ...req.body, author: req.user._id, rating: 0 });
    res.redirect('/posts');
});

router.get('/details/:postId', async (req, res) => {
    let post = await postsService.getOne(req.params.postId);
    let postData = await post.toObject();

    let authorName = "???";
    let isAuthor = postData.author == req.user?._id;
    let votes = post.getVotes();

    let hasVoted = post.votes.some(x => x._id == req.user?._id);
    
    res.render('posts/details', {...postData, authorName, isAuthor, hasVoted, votes})
});

router.get('/edit/:postId', async (req, res) => {
   let post = await postsService.getOne(req.params.postId);

   res.render('posts/edit', {...post.toObject()});
});

router.post('/edit/:postId', async (req, res) => {
    let { title, keyword, location, creationDate, imageUrl, description } = req.body;

    await postsService.updateOne(req.params.postId, { title, keyword, location, creationDate, imageUrl, description });
   
    res.redirect(`/posts/details/${req.params.postId}`);
})

module.exports = router;