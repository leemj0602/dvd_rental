/*
Name: Lee Mun Jun
Admin No.: p2227762
Class: DIT/1B/03
*/

const mysql = require('mysql');

const dbConnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "bed_dvd_root",
            password: "pa$$woRD123",
            database: "bed_dvd_db",
            multipleStatements: true //to use multiple sql statements in a query
        });
        return conn;
    }
};

module.exports = dbConnect