var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var twitter = require('twitter');
var FB = require('fb');
var AlchemyAPI = require('alchemy-api');

var twitter_config = require('./twitter.config');
var alchemy = new AlchemyAPI('05d95e59fa61fc33dad053a59f2e983478aaa2e0');

// Create a new twitter instance
var twitterClient = new twitter(twitter_config.twitter);

// parse various different custom JSON types as JSON
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     
  extended: true
}));								// to support URL-encoded bodies

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/'));

// set the home page route
app.get('/', function(req, res) {

    // make sure index is in the right directory. In this case /app/index.html
    res.render('index');
});

app.post('/city-info', function (req, res) {
	console.log(req.body.cityname);

	if(req.body) {
		var city = encodeURIComponent(req.body.cityname);

		twitterClient.get('search/tweets', {q: city, count: 5, lang: "en"}, function(error, tweets, response) {
			if(error) {
				res.status(500).send();
			} else {
				console.log("In Tweets");

				alchemy.sentiment(JSON.stringify(tweets), {}, function(err, response) {
					if (err) throw err;

					// See http://www.alchemyapi.com/api/ for format of returned object
					var sentiment = response.docSentiment;

					res.json({tweets: tweets, sentiment: sentiment});
				});
			}
		});
	}
});

app.post('/city-info-fb', function (req, res) {
	console.log(req.body.cityname);

	if(req.body) {
		var city = encodeURIComponent(req.body.cityname);

		twitterClient.get('search/tweets', {q: city, count: 5, lang: "en"}, function(error, tweets, response) {
			if(error) {
				res.status(500).send();
			} else {
				console.log("In Tweets");
				res.json(tweets);
			}
		});
	}
});

app.listen(port, function() {
    console.log('App is running on http://localhost:' + port);
});
