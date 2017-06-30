var express = require('express');
var path = require('path');
var app = express();

app.get('*', (req, res) => {
    //res.header('Cache-Control', "max-age=60, must-revalidate, private");
    res.sendFile(path.join(__dirname, 'dist/index.html'));

    console.log(path.join(__dirname, 'dist/index.html'))
});

app.listen(8080, function () {
    console.log('http://localhost:3000/');
});