const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const app = express();



app.get('/scrape', function(req,res){
	
	url = 'https://www.crossfit.com/workout/2017/12/07#/comments';

	request(url, function(error, response, html){
		if(!error){
		
			var $ = cheerio.load(html);
		
			var workout , day;
			var json = {day: "", workout :""};
			workout = $('.content').text();
			day = $('h1').text();
			json.workout = workout;
			json.day = day;
		}
		 else{
			console.log( error);
		}
	fs.writeFile('output.json', JSON.stringify(json,null, 4), function(err){
		console.log('File successfully written!');
	})
	
	res.send('Check your console')


	});	

})




app.listen('8081');

console.log('web app running on http://localhost:8081');

exports = module.exports = app;
