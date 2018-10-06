const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

function scrapeResults() {
  const url = 'https://www.stchrisschoolnh.org/apps/news/article/924074';
  request(url, function(error, response, html) {
    if (error) {
      throw new Error(error);
    }

    const $ = cheerio.load(html);

    let article = $('article.cf');
    console.log($);

    fs.writeFileSync('result.html', html);
  });
}

scrapeResults();
