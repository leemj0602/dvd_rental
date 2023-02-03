/*
Name: Lee Mun Jun
Admin No.: p2227762
Class: DIT/1B/03
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const film = require('../model/film');
const admin = require('../model/admin');
const JWT_SECRET = require('../config');
const isLoggedInMiddleWare = require('../auth/isLoggedInMiddleware');

app.use(bodyParser.json());// parse application/json
app.use(urlencodedParser); // parse application/x-www-form-urlencoded
app.options('*', cors());
app.use(cors());


app.get('/films', function (req, res) {
    var searchString = req.query.searchString + "%";

    film.getFilms(searchString, function (err, films) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(films);
        }
    });
});

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
    })
})

app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    admin.login(email, password, function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).send();
            return;
        }
        if (user === null) {
            res.status(401).send();
            return;
        }
        const payload = { staff_id: user.staff_id };
        jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" }, (error, token) => {
            if (error) {
                console.log(error);
                res.status(401).send();
                return;
            }
            res.status(200).send({
                token: token,
                staff_id: user.staff_id
            });
        })
    })
})

module.exports = app;