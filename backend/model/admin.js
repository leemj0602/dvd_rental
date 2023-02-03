var db = require('./databaseConfig');

const adminDB = {
    login: function (email, password, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Admin Login");
                var sql = "SELECT * FROM staff WHERE email = ? AND password = ?";
                conn.query(sql, [email, password], function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    if (result.length === 0) {
                        console.log("login fail")
                        return callback(null, null);

                    } else {
                        const user = result[0];
                        return callback(null, user);
                    }
                });
            }
        });
    }
}

module.exports = adminDB;