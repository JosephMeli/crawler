const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const pug = require('pug');

const app = express();

var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

var WOD = { day: '', workout: '' };

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  url =
    'https://www.crossfit.com/workout/' +
    year +
    '/' +
    month +
    '/' +
    day +
    '#/comments';
  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      var workout, day;

      workout = $('.content').text();
      day = $('h1').text();
      WOD.workout = workout;
      WOD.day = day;
      console.log(WOD);
    } else {
      console.log(error);
    }
  });

  res.render('index', { heading: WOD.day, content: 'testomg' });
});

app.get('/scrape', function(req, res) {
  url =
    'https://www.crossfit.com/workout/' +
    year +
    '/' +
    month +
    '/' +
    day +
    '#/comments';

  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      var workout, day;
      workout = $('.content').text();
      day = $('h1').text();
      WOD.workout = workout;
      WOD.day = day;
    } else {
      console.log(error);
    }
  });

  res.send(WOD);
});

app.listen('8081');

console.log('web app running on http://localhost:8081');

exports = module.exports = app;
