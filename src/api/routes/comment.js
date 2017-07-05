var express = require('express');
var result = require('../utils/result');
var router = express.Router();

var Comment = require('../models/Comment');

router.post('/comment', function (req, res) {
    Comment.create({ text: req.query.text }, result(res));
});

router.get('/comment', function (req, res) {
    Comment.find(result(res));
});

router.get('/comment/:id', function (req, res) {
    Comment.findById(req.params.id, result(res));
});

module.exports = router;