/*
Name: Lee Mun Jun
Admin No.: p2227762
Class: DIT/1B/03
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const film = require('../model/film');
const admin = require('../model/admin');
const category = require('../model/category');
const review = require('../model/review');
const isLoggedInMiddleWare = require('../auth/isLoggedInMiddleware');

app.use(bodyParser.json());// parse application/json
app.use(urlencodedParser); // parse application/x-www-form-urlencoded
app.options('*', cors());
app.use(cors());


app.get('/filmsByTitle', function (req, res) {
    var searchString = req.query.searchString + "%";
    var maxRental = req.query.maxRental;

    if (maxRental == undefined)
        maxRental = 99.99;

    maxRental = parseFloat(maxRental);

    film.getFilmsByTitle(searchString, maxRental, function (err, films) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(films);
        }
    });
});

app.get('/filmsByCategory', function (req, res) {
    var category = req.query.category;
    var maxRental = req.query.maxRental;

    if (maxRental == undefined)
        maxRental = 99.99;

    maxRental = parseFloat(maxRental);

    film.getFilmsByCategory(category, maxRental, function (err, films) {
        if (err) {
            res.status(500).send();
        }
        else {
            res.status(200).send(films);
        }
    })

})

app.get('/film', function (req, res) {
    var id = req.query.id;

    film.getFilm(id, function (err, film) {
        if (err) {
            // console.log(err);
            res.status(500).send();
        }
        else {
            res.status(200).send(film);
        }
    });
});

app.get('/categories', function (req, res) {
    category.getCategory(function (err, categories) {
        if (err) {
            res.status(500).send();
        }
        else {
            res.status(200).send(categories);
        }
    });
});

app.get('/reviews', function (req, res) {
    var film_id = req.query.film_id;

    review.getReviewByFilmID(film_id, function (err, review) {
        if (err) {
            res.status(500).send();
        }
        else {
            res.status(200).send(review);
        }
    });
});

app.get('/review', function (req, res) {
    var review_id = req.query.review_id;

    review.getReviewByReviewID(review_id, function (err, review) {
        if (err) {
            res.status(500).send();
        }
        else {
            res.status(200).send(review);
        }
    });
});

app.post('/review', function (req, res) {
    var film_id = req.body.film_id;
    var rating = req.body.rating;
    var comment = req.body.comment;

    review.addReview(film_id, rating, comment, function (err, result) {
        if (err) {
            res.status(500).send();
        }
        else {
            res.status(200).send(result);
        }
    });
});

app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    admin.login(email, password, function (err, result, token) {
        if (err) {
            res.status(500);
            res.send(err.statusCode);
        } else {
            res.setHeader('Content-Type', 'application/json');
            delete result[0]['password']; //clear the password in json data, do not send back to client
            console.log(result);
            res.status(200).json({ success: true, UserData: JSON.stringify(result), token: result, status: 'You are successfully logged in!' });
        }
    });
});

app.post('/actor', isLoggedInMiddleWare, function (req, res) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    admin.addActor(first_name, last_name, function (err, result) {
        if (err) {
            res.status(500).send();
        }
        else {
            res.status(201).send(result);
        }
    });
});

app.get('/checkEmail', function (req, res) {
    var email = req.query.email;

    admin.checkEmail(email, function (err, result) {
        if (err) {
            res.status(500).send();
        }
        else {
            res.status(200).send(result);
        }
    });
});

app.post('/customer', isLoggedInMiddleWare, function (req, res) {
    var store_id = req.body.store_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var address = req.body.address;

    var internalErr = { error_msg: "Internal server error" };
    var existingEmail = { error_msg: "email already exist" };
    var missingData = { error_msg: "missing data" };

    admin.addCustomer(address.address_line1, address.address_line2, address.district, address.city_id, address.postal_code, address.phone, store_id, first_name, last_name, email, function (err, result) {
        if (address.address_line1 == null || address.address_line2 == null || address.district == null || address.city_id == null || address.postal_code == null || address.phone == null || store_id == null || first_name == null || last_name == null || email == null) {
            res.status(400).send(missingData);
        }
        else {
            if (err) {
                res.status(500).send(internalErr);
            }
            else {
                if (result === null) {
                    res.status(409).send(existingEmail);
                }
                else {
                    res.status(201).send(result);
                }
            }

        }
    });
});


module.exports = app;