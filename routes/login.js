var express = require('express');
var router = express.Router();
var login = require('../Middleware/login');

//var authentication = require('/authentication');

router.post('/', login.signIn);

module.exports = router;