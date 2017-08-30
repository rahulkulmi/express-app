'use strict';
module.exports = function(app, router) {
  var miscController = require('../rest_controllers/misc_controller');

  // api routes
  router.post('/add', miscController.add);
  router.get('/hello', miscController.hello);

  app.use('/api/v1', router);
};
