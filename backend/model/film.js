const db = require("./databaseConfig.js");

const filmDB = {
    getFilms: function (searchString, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(`Search for film where title like ${searchString}`);
                var sql = 'SELECT * FROM film_list WHERE title LIKE ?';
                conn.query(sql, [searchString], function (err, result) {
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
    getFilm: function (id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(`Navigating to film: ${id}`);
                var sql = 'SELECT * FROM film_list WHERE FID = ?';
                conn.query(sql, [id], function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        console.log(result);
                        return callback(result, null);
                    }
                });
                conn.end();
            }
        });
    }
}

module.exports = filmDB;