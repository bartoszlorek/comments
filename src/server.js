var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var color = require('./utils/log-color');
var path = require('path');

// ----------------------------------------
var API = require('./api');
var PORT = process.env.PORT || 8080;
var BASE = 'dist/index.html';
// ----------------------------------------

var app = express();
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', API);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', BASE));
});

app.listen(PORT, () => {
    var url = 'http://localhost:' + PORT;
    console.log(`server is running at ${color(url)}`);
});