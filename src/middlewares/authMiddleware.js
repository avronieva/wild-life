const { AUTH_COOKIE_NAME, SECRET } = require("../constants");
const { jwtVerify } = require("../utils/jwtUtils");

exports.authMiddleware = function (req, res, next) {
    let token = req.cookies[AUTH_COOKIE_NAME];

    if (token) {
        jwtVerify(token, SECRET)
            .then((decodedToken) => {
                req.user = decodedToken;
                next();
            })
            .catch((error) => {
                res.clearCookie(AUTH_COOKIE_NAME);
                res.redirect('/auth/login');
            });
    } else {
        next();
    }
}

exports.isAuth = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}