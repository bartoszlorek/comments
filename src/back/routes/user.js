var express = require('express');
var sanitize = require('mongo-sanitize');
var result = require('../utils/result');
var trim = require('../utils/trim');
var router = express.Router();

var User = require('../models/User');

router.get('/users', function (req, res) {
    User.find(result(res));
});

router.post('/signup', function (req, res) {
    User.create(req.body, result(res,
        'user registered'
    ));
});

router.post('/login', function (req, res) {
    User.findOne({
        $and: [
            { email: sanitize(req.body.email) },
            { password: sanitize(req.body.password) }
        ]
    }, result(res,
        'user login successful',
        'incorrect email or password'
    ));
});

module.exports = router;