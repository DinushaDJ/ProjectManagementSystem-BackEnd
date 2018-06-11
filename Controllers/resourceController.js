var express = require('express');
var bodyParser = require('body-parser');

var Resources = require('../Models/resource');

var app = express();

app.get('/resources', function(req, res) {
    return res.json(app.all('tasks'));
});