# oracle-rest-get

A simple example for creating configurable readonly GET REST-endpoints for data in an Oracle DB tables or views using [oracledb](https://www.npmjs.com/package/oracledb).

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

## Considerations before production use

The provided code is a first step to get a read-only REST interface up & running for an Oracle DB. Before using it in production you should at least consider the following points:

- Securing the configuration where sensible data is currently stored as plain text. For that I recommend my project [secure-config](https://www.npmjs.com/package/@tsmx/secure-config).
- Adding filter functionality to the list retrieval methods, e.g. as query strings. Also here have a closer look on security as passed values will have to make it to your queries.
- Take care about compound keys if needed.
- Be sure that the provided DB user only has read rights on the objects (tables/views) he really needs. 