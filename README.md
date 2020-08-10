# OracleRESTService

A simple example for creating configurable readonly GET REST-endpoints for data in an Oracle DB backend using [oracledb](https://www.npmjs.com/package/oracledb).

## Configuration setup

```json
{
    "dbconfig": {
        "user": "test",
        "password": "test",
        "connectString": "localhost/xepdb1"
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

## Routes

The sample code/config dynamically registers the following routes under `localhost:3000` to have a basic REST API for data retrieval:
```
GET /storage
GET /storage/:id 
GET /contract
GET /contract/:id
```
Queries the respective tables and returns the result-set as an array of JSON objects. 

## Pre-requisites

- A locally installed Oracle XE 18c with user `test` in the container `XEPDB1`.
- Oracle libraries registered with `ldconfig`. To do so, as root:
  - Add path to the libs to `/etc/ld.so.conf` directly or create a new conf file under `/etc/ld.so.conf.d`
  - Run `ldconfig`
  - E.g. assuming Oracle was installed in `/opt/oracle`:
  ```bash
  $ echo "/opt/oracle/product/18c/dbhomeXE/lib" > /etc/ld.so.conf.d/oracle-xe-18c.conf
  $ ldconfig
  ```