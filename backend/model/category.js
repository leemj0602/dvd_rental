/*
Name: Lee Mun Jun
Admin No.: p2227762
Class: DIT/1B/03
*/

const db = require('./databaseConfig');

const catDB = {
    getCategory: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Get all categories");
                var sql = "SELECT * FROM category";
                conn.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
                conn.end();
            }
        });
    },
}

module.exports = catDB;