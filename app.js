require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var SECURE = require('express-jwt-jwks')({
    jwks : util.JWKS
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Open routes
app.use('/open', require('./routes/example'));

//JWKS
app.use(SECURE);

//Protected routes
app.use('/protected', require('./routes/example'));

module.exports = app;
