var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    text: String
});

module.exports = mongoose.model('Comment', schema);