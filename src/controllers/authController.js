const router = require('express').Router();

const { AUTH_COOKIE_NAME } = require('../constants');
const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, rePassword } = req.body;

    if (password !== rePassword) {
        res.locals.error = 'Password mismatch';
        return res.render('auth/register');
    }

    try {
        await authService.register({ firstName, lastName, email, password });

        let token = await authService.login({ email, password });
        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('auth/register', { error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let token = await authService.login({ email, password });
        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
})

module.exports = router;