var express = require('express');
var mongoose = require('mongoose');
var toColor = require('./back/utils/toColor');
var api = require('./back');
var path = require('path');

var PORT = process.env.PORT || 8080;
var BASE = 'dist/index.html';

var app = express();
api('/api', app);

app.use(express.static('dist'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', BASE));
});

app.listen(PORT, () => {
    var url = 'http://localhost:' + PORT;
    console.log(`server is running at ${toColor(url)}`);
});