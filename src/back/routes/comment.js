var express = require('express');
var result = require('../utils/result');
var sanitize = require('mongo-sanitize');
var router = express.Router();

var Comment = require('../models/Comment');

router.post('/comment', function (req, res) {
    let { text } = req.query;
    Comment.create({
        text: text && text.trim() || ''
    }, result(res));
});

router.get('/comment', function (req, res) {
    Comment.find(result(res));
});

router.get('/comment/:id', function (req, res) {
    Comment.findById(req.params.id, result(res));
});

router.post('/comment/:id/delete', function (req, res) {
    Comment.findByIdAndRemove(req.params.id, result(res,
        () => null
    ));
});

module.exports = router;