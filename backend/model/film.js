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
    // getFilm: function (film_id, callback) {
    //     var conn = db.getConnection();
    //     conn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         }
    //         else {
    //             console.log("get film id " + film_id);
    //             var sql = "SELECT * FROM film WHERE film_id = ?";
    //             conn.query(sql, [film_id], function (err, result) {
    //                 if (err) {
    //                     console.log(err);
    //                     return callback(err, null);
    //                 }
    //                 else {
    //                     console.log(result);
    //                     return callback(null, result);
    //                 }
    //             });
    //         }
    //     });
    // }

}

module.exports = filmDB;