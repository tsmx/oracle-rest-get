var oracledb = require('oracledb');

// helper function, connections should always be released when not needed
function doRelease(connection) {
    connection.close(
        function (err) {
            if (err) {
                console.error(err.message);
            }
        });
}

// callback function for handling SQL result
function handleResult(err, result, res, connection) {
    if (err) {
        console.error(err.message);
        doRelease(connection);
        return;
    }
    res.json(result.rows);
    doRelease(connection);
}

function query(tablename, res, id) {
    var dbConfig = require('../config/appconfig.js').dbConfig;
    // sql statement and empty bind parameter for selecting all objects
    var sqlStatement = `SELECT * FROM ` + tablename;
    var bindArray = [];
    if(id) {
        // select by id - extend sql statement and set bind parameter
        sqlStatement = sqlStatement + ` WHERE ID = :ID`;
        bindArray = [id];
    } 
    oracledb.getConnection(
        dbConfig,
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                sqlStatement,
                bindArray,
                {
                    outFormat: oracledb.OBJECT
                },
                function (err, result) {
                    handleResult(err, result, res, connection);
                });
        });
}

module.exports.queryTableToJSON = function (tablename, res) {
    query(tablename, res, null);
}

module.exports.queryTableToJSONbyID = function (tablename, res, id) {
    query(tablename, res, id);
}