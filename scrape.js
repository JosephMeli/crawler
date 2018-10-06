const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const pug = require('pug');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

request('https://www.stchrisschoolnh.org/apps/news/article/924074', function(
  error,
  response,
  html
) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('span.comhead').each(function(i, element) {
      var a = $(this).prev();
      console.log(a.text());
    });
  }
});

app.listen('8081');

console.log('web app running on http://localhost:8081');

exports = module.exports = app;
