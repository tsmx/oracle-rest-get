var express = require('express');
var app = express();
var appConfig = require('./config/appconfig.js');

appConfig.initialize(app);

app.listen(3000, function () {
  console.log('OracleRESTService started listening on port 3000...');
});
