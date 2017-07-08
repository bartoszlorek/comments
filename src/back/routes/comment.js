var express = require('express');
var result = require('../utils/result');
var trim = require('../utils/trim');
var router = express.Router();

var Comment = require('../models/Comment');

router.get('/comment', function (req, res) {
    Comment.find(result(res));
});

router.get('/comment/:id', function (req, res) {
    Comment.findById(req.params.id, result(res));
});

router.post('/comment', function (req, res) {
    let text = trim(req.query.text);
    Comment.create({ text }, result(res));
});

router.post('/comment/:id/update', function (req, res) {
    Comment.findById(req.params.id, result(res,
        (comment) => {
            comment.text = trim(req.query.text);
            comment.save(result(res, () => 'successfully updated'));
        }
    ));
});

router.post('/comment/:id/delete', function (req, res) {
    Comment.findByIdAndRemove(req.params.id, result(res,
        () => 'successfully deleted'
    ));
});

module.exports = router;