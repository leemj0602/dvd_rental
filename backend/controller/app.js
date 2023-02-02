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

app.use(bodyParser.json());// parse application/json
app.use(urlencodedParser); // parse application/x-www-form-urlencoded
app.options('*', cors());
app.use(cors());


app.get('/films', function (req, res) {
    var searchString = "%" + req.query.searchString + "%";

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
            res.status(500).send(err);
        }
        else {
            res.status(200).send(film);
        }
    })
})


module.exports = app;