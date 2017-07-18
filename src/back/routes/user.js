var express = require('express');
var passport = require('passport');
var isAuth = require('../auth/isAuth');
var result = require('../utils/result');
var format = require('../utils/format');
var trim = require('../utils/trim');
var router = express.Router();

var User = require('../models/User');

router.post('/signup', function (req, res, next) {
    passport.authenticate('signup', result(res, {
        success: (data) => {
            data = Object.assign({}, req.body, data);
            User.create(data, result(res, {
                success: (user) => req.login(user,
                    (error) => result(res, {
                        success: 'new user successfully registered and logged in.',
                        fail: 'login failed for new user'
                    })(error, user)
                )
            }))
        },
        fail: 'username is already taken'
    }))(req, res, next);
});

router.post('/login', function (req, res, next) {
    passport.authenticate('login', result(res, {
        success: (user) => req.login(user,
            (error) => result(res, {
                success: 'user successfully logged in'
            })(error, user)
        ),
        fail: 'incorrect username or password'
    }))(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logout();
    res.json(format.success('user successfully logged out'));
});

router.get('/user', function (req, res) {
    User.find(result(res));
});

router.get('/user/:id', isAuth, function (req, res) {
    User.findById(req.params.id, result(res));
});

router.post('/user/:id/delete', isAuth, function (req, res) {
    User.findByIdAndRemove(req.params.id, result(res, {
        success: 'user successfully deleted',
        fail: 'user does not exist'
    }));
});

module.exports = router;