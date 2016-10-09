const express = require('express');
const cors = require('cors');
const app = express();
const request = require('request');

app.use(cors());

app.set('port', (process.env.PORT || 5000));

const responses = {};

app.get('/forecast', (req, res) => {
	if (responses[req.query.location]) {
		console.log('returning from cache');
		res.json(responses[req.query.location]);
	} else {
		request.get({
			url:`http://api.openweathermap.org/data/2.5/forecast?q=${req.query.location}&mode=json&appid=495aa1ac8e1ab354e876a078522bdb0b&units=metric`,
			json: true
		}, (err, response, body) => {
			responses[req.query.location] = body;
			res.json(body);
		});
	}
});

app.listen(app.get('port'), function(){
	console.log(`CORS-enabled web server listening on port ${app.get('port')}`);
});
