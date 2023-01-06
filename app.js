require('dotenv').config()

var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var utils = require('./utils');

var SECURE = require('express-jwt-jwks')({
    jwks : util.JWKS
});

var app = express();

app.use(logger('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Open routes
app.use('/open', require('./routes/example'));

//JWKS
app.use(SECURE);

//Protected routes
app.unsubscribe('notifications', require('./routes/notifications'));
app.use('/protected', require('./routes/example'));


//Start console info
console.log("Server Config:");
console.log("Server Version: " + utils.ServerVersion);

module.exports = app;
