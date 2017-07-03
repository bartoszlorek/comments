var express = require('express');
var output = require('../utils/output');
var routes = express.Router();

var Comment = require('../models/Comment');

routes.post('/comment', function (req, res) {
    Comment.create({ text: req.body.text }, output(res));
});

routes.get('/comment', function (req, res) {
    Comment.find(output(res));
});

routes.get('/comment/:id', function (req, res) {
    Comment.findById(req.params.id, output(res));
});

module.exports = routes;