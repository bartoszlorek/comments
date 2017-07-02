var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();

app.use(express.static('dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(8080, function () {
    console.log('http://localhost:8080/');
});

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('mongodb is running!')
});