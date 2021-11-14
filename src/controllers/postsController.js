const router = require('express').Router();

const postsService = require('../services/postsService');

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
})

module.exports = router;