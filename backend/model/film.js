/*
Name: Lee Mun Jun
Admin No.: p2227762
Class: DIT/1B/03
*/

const db = require("./databaseConfig.js");

const filmDB = {
    getFilmsByTitle: function (searchString, maxRental, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(`Search for films where title like ${searchString} and max rental: ${maxRental}`);
                var sql = 'SELECT * FROM film_list WHERE title LIKE ? AND price <= ?';
                conn.query(sql, [searchString, maxRental], function (err, result) {
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

    getFilmsByCategory: function (category, maxRental, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(`Search for ${category} films and max rental: ${maxRental}`);
                var sql = 'SELECT * FROM film_list WHERE category = ? AND price <= ?';
                conn.query(sql, [category, maxRental], function (err, result) {
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

    getFilm: function (film_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(`Navigating to film: ${film_id}`);
                var sql = 'SELECT * FROM film_list WHERE FID = ?';
                conn.query(sql, [film_id], function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
                // console.log(err);
                conn.end();
            }
        });
    }
}

module.exports = filmDB;