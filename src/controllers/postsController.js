const router = require('express').Router();

const postsService = require('../services/postsService');
const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');
const { isAuthor, isNotAuthor } = require('../middlewares/postAuthMiddleware');


router.get('/', async (req, res) => {
    let posts = await postsService.getAll();
    res.render('posts/all', { posts });
});

router.get('/create', isAuth, (req, res) => {
    res.render('posts/create');
});

router.post('/create', isAuth, async (req, res) => {
    await postsService.create({ ...req.body, author: req.user._id, rating: 0 });
    res.redirect('/posts');
});

router.get('/details/:postId', async (req, res) => {
    let post = await postsService.getOne(req.params.postId);
    let postData = await post.toObject();
    let author = await authService.getUser(postData.author);

    let authorName = `${author.firstName} ${author.lastName}`;
    let isAuthor = postData.author == req.user?._id;

    let votes = [];
    for (let i = 0; i < post.votes.length; i++) {
        let voter = await authService.getUser(post.votes[i]);
        votes.push(voter.email);
    }
    votes = votes.join(', ');

    let hasVoted = post.votes.some(x => x._id == req.user?._id);

    res.render('posts/details', { ...postData, authorName, isAuthor, hasVoted, votes })
});

router.get('/edit/:postId', isAuth, isAuthor, async (req, res) => {
    let post = await postsService.getOne(req.params.postId);

    res.render('posts/edit', { ...post.toObject() });
});

router.post('/edit/:postId', isAuth, isAuthor, async (req, res) => {
    let { title, keyword, location, creationDate, imageUrl, description } = req.body;

    await postsService.updateOne(req.params.postId, { title, keyword, location, creationDate, imageUrl, description });

    res.redirect(`/posts/details/${req.params.postId}`);
});

router.get('/delete/:postId', isAuth, isAuthor, async (req, res) => {
    await postsService.deleteOne(req.params.postId);

    res.redirect('/posts');
});

router.get('/:userId', isAuth, async (req, res) => {
    let allUserPosts = await postsService.getAllUserPosts(req.params.userId);
    let author = await authService.getUser(req.params.userId);

    let authorName = `${author.firstName} ${author.lastName}`;

    res.render('posts/my-posts', { allUserPosts, authorName });
});

router.get('/vote-up/:postId', isAuth, isNotAuthor, async (req, res) => {
    await postsService.increaseVotes(req.params.postId, req.user?._id);

    res.redirect(`/posts/details/${req.params.postId}`);
});

router.get('/vote-down/:postId', isAuth, isNotAuthor, async (req, res) => {
    await postsService.decreaseVotes(req.params.postId, req.user?._id);

    res.redirect(`/posts/details/${req.params.postId}`);
});

module.exports = router;