var routeItems = new Map();
var appConfig = require('../config/config.json');
var oracledbcontroller = require('../controller/oracledbcontroller');

function logRouteItem(item) {
    console.log("   --> table: " + item.tablename);
    console.log("   --> id:    " + item.id);
}

module.exports.initialize = function (app) {
    console.log("OracleRESTService initializing... ");
    // get the route items and register them 
    appConfig.entities.forEach(element => {
        // save route item in map
        routeItems.set(element.url, element);
        // register route for getting all objects
        app.get(element.url, (req, res) => { oracledbcontroller.getData(req, res, element.tablename) });
        console.log("  registered url: " + element.url);
        // register route for getting a single object by ID
        app.get(element.url + '/:id', (req, res) => { oracledbcontroller.getDataByID(req, res, element.tablename, req.params.id) });
        console.log("  registered url: " + element.url + '/:id');
        logRouteItem(element);
    });
    console.log("OracleRESTService initialization done. ");
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