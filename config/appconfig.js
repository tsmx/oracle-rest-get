const appConfig = require('../config/config.json');
const oracledbcontroller = require('../controller/oracledbcontroller');
const logger = require('../utils/logging').logger;

var routeItems = new Map();

function logRouteItem(item) {
    logger.info("   --> table: " + item.tablename);
    logger.info("   --> id:    " + item.id);
}

module.exports.initialize = function (app) {
    logger.info("OracleRESTService initializing... ");
    // get the route items and register them 
    appConfig.entities.forEach(element => {
        // save route item in map
        routeItems.set(element.url, element);
        // register route for getting all objects
        app.get(element.url, (req, res) => { oracledbcontroller.getData(req, res, element.tablename) });
        logger.info("  registered url: " + element.url);
        // register route for getting a single object by ID
        app.get(element.url + '/:id', (req, res) => { oracledbcontroller.getDataByID(req, res, element.tablename, req.params.id) });
        logger.info("  registered url: " + element.url + '/:id');
        logRouteItem(element);
    });
    logger.info("OracleRESTService initialization done. ");
}

module.exports.dbConfig = appConfig.dbconfig;

module.exports.getRouteItem = function (url) {
    if (routeItems.has(url)) {
        return routeItems.get(url);
    }
    else {
        return null;
    }
}