'use strict';
module.exports = function(app, router) {
  require('./v1')(app, router);
};
