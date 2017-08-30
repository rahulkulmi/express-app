'use strict';
var express = require('express');
var router = express.Router();
var session = require('express-session');
var config = require('./config/config');
var log = require('./app_util/logger');
var logger = require('morgan');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var response = require('./services/api_response');
var appException = require('./app_util/exceptions');

// create express app
var app = express();

// middleware
app.use(session({
  secret: config.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(expressValidator({
  customValidators: {
    isArray: function(value) {
      return Array.isArray(value);
    }
  }
}));
log.format = ':remote-addr :remote-user ":method :url :status :response-time ms :res[content-length] HTTP/:http-version" ":user-agent"';
app.use(logger(log.format, { 'stream': log.stream}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, device_id, device_token');
  next();
});

// api routes
require('./routes/routes')(app, router);
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  response.errorResponse(req, res, appException.INTERNAL_SERVER_ERROR(), err.stack);
}
app.use(errorHandler);

// finally ready to listen
app.listen(config.PORT, function() {
  log.info('Listening on port ' + config.PORT);
});

module.exports = app;
