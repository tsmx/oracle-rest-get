const dbhelper = require('../database/dbhelper.js');
const logger = require('../utils/logging').logger;

module.exports.getData = function (req, res, tablename) {
    var start = new Date();
    var logEntry = "new request from " + req.ip + " - url: " + req.url;
    dbhelper.queryTableToJSON(tablename, res);
    logger.info(logEntry + " --> request served [" + (new Date() - start) + "ms]");
}

module.exports.getDataByID = function (req, res, tablename, id) {
    var start = new Date();
    var logEntry = "new request from " + req.ip + " - url: " + req.url;
    dbhelper.queryTableToJSONbyID(tablename, res, id);
    logger.info(logEntry + " --> request served [" + (new Date() - start) + "ms]");
}
