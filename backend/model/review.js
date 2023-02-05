/*
Name: Lee Mun Jun
Admin No.: p2227762
Class: DIT/1B/03
*/

const db = require("./databaseConfig.js");

const reviewDB = {
    getReviewByFilmID: function (film_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(`Get reviews for film #${film_id}`);
                var sql = 'SELECT * FROM film_review WHERE film_id = ?';
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
                conn.end();
            }
        });
    },

    getReviewByReviewID: function (review_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(`Get review #${review_id}`);
                var sql = 'SELECT * FROM film_review WHERE review_id = ?';
                conn.query(sql, [review_id], function (err, result) {
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

    addReview: function (film_id, rating, comment, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(`Add review for film #${film_id}`);
                var sql = 'Insert into film_review (film_id, rating, comment) values(?,?,?)';
                conn.query(sql, [film_id, rating, comment], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    },
}

module.exports = reviewDB;