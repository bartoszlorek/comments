var express = require('express');
var passport = require('passport');
var sanitize = require('mongo-sanitize');
var result = require('../utils/result');
var trim = require('../utils/trim');
var router = express.Router();

var User = require('../models/User');

router.get('/users', function (req, res) {
    User.find(result(res));
});

router.post('/signup', function (req, res, next) {
    passport.authenticate('signup', result(res,
        data => {
            data = Object.assign({}, req.body, data);
            User.create(data, result(res,
                user => req.logIn(user,
                    err => result(res,
                        'user registered',
                        'login failed'
                    )(err, user)
                )
            ));
        },
        (error) => error,
        () => 'user already exists with username ' + req.body.username
    ))(req, res, next);
});

router.post('/login', function (req, res) {
    passport.authenticate('login', function (err, user, info) {
        console.log(err, user, info)
    })(req, res, next);
});

// router.post('/login', function (req, res) {
//     User.findOne({
//         $and: [
//             { email: sanitize(req.body.email) },
//             { password: sanitize(req.body.password) }
//         ]
//     }, result(res,
//         'user login successful',
//         'incorrect email or password'
//     ));
// });

// console.log('User Not Found with username ' + username);
// console.log('Invalid Password');

module.exports = router;