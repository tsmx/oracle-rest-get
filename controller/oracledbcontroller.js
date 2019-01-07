var dbhelper = require('../database/dbhelper.js');
var appconfig = require('../config/appconfig.js');

function trimUrlParameters(req) {
    var url = req.url;
    var n = url.indexOf("?");
    var trimmedUrl = url.substring(0, n != -1 ? n : url.length);
    return trimmedUrl;
}

module.exports.getData = function getData(req, res) {
    var start = new Date();
    var requestedContext = trimUrlParameters(req);
    var logEntry = "new request from " + req.ip + " - url: " +req.url + " context: "+ requestedContext;

    var configItem = appconfig.getRouteItem(requestedContext);
    if (!configItem) {
        console.log(logEntry + " --> no config item found!");
        res.send("ERROR! URL not  configured in the service! Check the service configuration.");
        return;
    }
    if (configItem.hasOwnProperty('id') && configItem.id && Object.keys(req.query).includes(configItem.id.toLowerCase())) {
        dbhelper.queryTableToJSONbyID(configItem.tablename, res, req.query[configItem.id.toLowerCase()]);
    } else {
        dbhelper.queryTableToJSON(configItem.tablename, res);
    }
    console.log(logEntry + " --> request served [" + (new Date() - start) + "ms]");
}
