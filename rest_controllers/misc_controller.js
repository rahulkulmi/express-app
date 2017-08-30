'use strict';
var response = require('../services/api_response');
var appException = require('../app_util/exceptions');
var msg = require('../app_util/messages');

module.exports.hello = function(req, res) {
  try {
    response.successResponse(req, res, msg.serverStatus);
  } catch (err) {
    response.errorResponse(req, res, appException.INTERNAL_SERVER_ERROR(), err.stack);
  }
};

module.exports.add = function(req, res) {
  try {
    req.checkBody('A', msg.valueANotFound).notEmpty();
    req.checkBody('B', msg.valueBNotFound).notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      return response.errorResponse(req, res, appException.BAD_REQUEST(msg.validationError + ' : ' + errors[0].msg));
    }

    var reqData = req.body;
    var A = parseInt(reqData.A);
    var B = parseInt(reqData.B);
    response.successResponse(req, res, msg.valueOfC + (A + B));
  } catch (err) {
    response.errorResponse(req, res, appException.INTERNAL_SERVER_ERROR(), err.stack);
  }
};
