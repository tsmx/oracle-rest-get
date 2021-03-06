// declare and export a logger with local timestamp

var winston = require('winston');
var format = winston.format;

const myFormat = format.printf((info) => {
    return `${info.timestamp} ${info.level.toUpperCase()} ${info.message}`;
});

var transporters = [new winston.transports.Console()];
if (process.env.NODE_ENV == 'test') {
    transporters[0].silent = true;
}

var logger = winston.createLogger({
    format: format.combine(format.timestamp(), myFormat),
    transports: transporters
});

// export a basic logger object
module.exports.logger = logger;

// logger with a specified prefix
module.exports.createPrefixLogger = function (prefix) {
    var customFormat = format.printf((info) => {
        return `${info.timestamp} ${info.level.toUpperCase()} ${prefix} ${info.message}`;
    });
    return winston.createLogger({
        format: format.combine(format.timestamp(), customFormat),
        transports: transporters
    });
};

module.exports.logRequest = function (logger, req) {
    logger.info(req.method + ' ' + req.originalUrl + ' requested by client ' + req.authData.client + ' (remote ip: ' + req.ip + ')');
};