'use strict';

function appConfig() {
  var processEnv = process.env.NODE_ENV || 'development';
  var env = require('./' + processEnv + '.json');

  return {
    PORT: env.PORT,
    SECRET_KEY: env.SECRET_KEY,
  };
}

//Export configuration object
module.exports = appConfig();
