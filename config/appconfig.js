var routeItems = new Map();
var appConfig = require('../config/config.json');
var oracledbcontroller = require('../controller/oracledbcontroller');

function logRouteItem(item) {
    console.log("   --> url:   " + item.url);
    console.log("   --> table: " + item.tablename);
    console.log("   --> id:    " + item.id);
}

module.exports.initialize = function (app) {
    console.log("OracleRESTService initializing... ");
    // get the route items and register them 
    appConfig.entities.forEach(element => {
        // save route item in map
        routeItems.set(element.url, element);
        // register route
        app.get(element.url, oracledbcontroller.getData);
        console.log("  registered url: " + element.url);
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