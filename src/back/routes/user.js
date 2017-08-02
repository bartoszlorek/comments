var express = require('express');
var passport = require('passport');
var isAuth = require('../auth/isAuth');
var result = require('../utils/result');
var token = require('../auth/token');
var router = express.Router();

var User = require('../models/User');

router.post('/signup', function (req, res, next) {
    passport.authenticate('signup', result(res, {
        success: (data) => {
            data = Object.assign({}, req.body, data);
            User.create(data, result(res, {
                success: (user) => token(user)
            }))
        },
        fail: 'username is already taken'
    }))(req, res, next);
});

router.post('/auth', function (req, res, next) {
    passport.authenticate('auth', result(res, {
        success: (user) => token(user),
        fail: 'incorrect username or password'
    }))(req, res, next);
});

router.get('/user', function (req, res) {
    User.find(result(res));
});

router.get('/user/:id', isAuth(), function (req, res) {
    User.findById(req.params.id, result(res));
});

router.post('/user/:id/delete', isAuth('Admin'), function (req, res) {
    User.findByIdAndRemove(req.params.id, result(res, {
        success: 'user successfully deleted',
        fail: 'user does not exist'
    }));
});

module.exports = router;