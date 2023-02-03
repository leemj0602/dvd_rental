var db = require('./databaseConfig');
var config = require('../config.js');
var jwt = require('jsonwebtoken');

const adminDB = {
    login: function (email, password, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Log in with email: " + email + " and password: " + password);
                var sql = "SELECT * FROM staff WHERE email = ? AND password = ?";
                conn.query(sql, [email, password], function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }

                    else {
                        var token = "";

                        if (result.length == 1) {
                            token = jwt.sign({ id: result[0].staff_id, email: result[0].email }, config.key, {
                                expiresIn: 86400 //expires in 24 hrs
                            });

                            console.log("@@token " + token);
                            return callback(null, token, result);
                        }

                        else {
                            var err2 = new Error("Email/Password does not match.");
                            err2.statusCode = 500;
                            return callback(err2, null, null);
                        }
                    }
                });
                conn.end();
            }
        });
    },
    addActor: function (first_name, last_name, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                consosle.log(err);
                return callback(err, null)
            }
            else {
                console.log("Add actor with first_name: " + first_name + " and last_name: " + last_name);
                var sql = 'INSERT INTO actor(first_name, last_name) values(?, ?)';
                conn.query(sql, [first_name, last_name], function (err, result) {
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

    addCustomer: function (address_line1, address_line2, district, city_id, postal_code, phone, store_id, first_name, last_name, email, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Add customer");
                var sqlEmailCheck = "SELECT * FROM customer WHERE email = ?";
                var sqlInsert = "INSERT INTO address (address, address2, district, city_id, postal_code, phone) values (?, ?, ?, ?, ?, ?); INSERT INTO customer (store_id, first_name, last_name, email, address_id) values (?, ?, ?, ?, (SELECT MAX(address_id) FROM address))"
                if (address_line1 == null || address_line2 == null || district == null || city_id == null || postal_code == null || phone == null || store_id == null || first_name == null || last_name == null || email == null) {
                    console.log(err);
                    return callback(err);
                }
                else {
                    conn.query(sqlEmailCheck, [email], function (err, result) {
                        if (err) {
                            console.log(err);
                            return callback(err, null);
                        }
                        if (result == "") {
                            conn.query(sqlInsert, [address_line1, address_line2, district, city_id, postal_code, phone, store_id, first_name, last_name, email], function (err, result) {
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
                        else {
                            console.log(err);
                            return callback(err, null);
                        }
                    });
                }
            }
        });
    },

}

module.exports = adminDB;