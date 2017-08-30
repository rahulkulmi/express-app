'use strict';
module.exports = {
  INTERNAL_SERVER_ERROR: function(customMsg) {
    return {'rcode': 500, 'httpCode': 500,
      'message': 'Server encountered some problem', 'customMsg': customMsg};
  },
  BAD_REQUEST: function(customMsg) {
    return {'rcode': 400, 'httpCode': 400,
      'message': 'Bad request', 'customMsg': customMsg};
  },
  VALIDATION_EXCEPTION: function(rcode, customMsg) {
    return {'rcode': rcode, 'httpCode': 400,
      'message': 'Bad request', 'customMsg': customMsg};
  }
};
