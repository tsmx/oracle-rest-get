var express = require('express');
const logger = require('./utils/logging').logger;

var app = express();
var appConfig = require('./config/appconfig.js');

appConfig.initialize(app);

app.listen(3000, function () {
  logger.info('OracleRESTService started listening on port 3000...');
});
