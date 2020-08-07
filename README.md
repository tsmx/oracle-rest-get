# OracleRESTService

A simple example for creating dynamic readonly GET REST-endpoints for tables in an Oracle DB backend using [oracledb](https://www.npmjs.com/package/oracledb).

## Configuration setup

```json
{
    "dbconfig": {
        "user": "test",
        "password": "test",
        "connectString": "localhost/xe"
    },
    "entities": [
        {
            "url": "/storage",
            "tablename": "STORAGE",
            "id": "ID"
        },
        {
            "url": "/contract",
            "tablename": "CONTRACT",
            "id": "ID"
        }
    ]
}
```

Dynamically registers two routes `/storage` and `/contract` for the respective Oracle tables. Queries the tables and return the result-set as an array of JSON objects. 