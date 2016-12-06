var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var _ = require('underscore');
//=========================================================================
//TWITTER
//=========================================================================
var twitter = require('twitter');
var twitter_config = require('./config/twitter.config');
var twitterClient = new twitter(twitter_config.twitter);
//=========================================================================
//ALCHEMY
//=========================================================================
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('05d95e59fa61fc33dad053a59f2e983478aaa2e0');
//=========================================================================
//TUMBLR
//=========================================================================
var tumblr = require('tumblr.js');

var tumblr_config = require('./config/tumblr.config');
var tumblr_oauth = {
	consumer_key: tumblr_config.tumblr.consumer_key,
	consumer_secret: tumblr_config.tumblr.consumer_secret,
	token: tumblr_config.tumblr.token,
	token_secret: tumblr_config.tumblr.token_secret
};
//=========================================================================
//INSTAGRAM
//=========================================================================
var ig = require('instagram-node').instagram();
var insta_config = require('./config/insta.config');

ig.use({ client_id: insta_config.insta.client_id, client_secret: insta_config.insta.client_secret });

//=========================================================================
//YELP
//=========================================================================
var Yelp = require('yelp');
var yelp_config = require('./config/yelp.config');
var yelp_oauth = {
	consumer_key: yelp_config.yelp.consumer_key,
	consumer_secret: yelp_config.yelp.consumer_secret,
	token: yelp_config.yelp.token,
	token_secret: yelp_config.yelp.token_secret
};
var yelp = new Yelp(yelp_oauth);

//=========================================================================

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
	console.log('In tweets');

	if(req.body) {
		var city = encodeURIComponent(req.body.cityname);

		twitterClient.get('search/tweets', {q: city, count: 5, lang: "en"}, function(error, tweets, response) {
			if(error) {
				res.status(500).send();
			} else {
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

app.post('/city-info-tumblr', function (req, res) {
	console.log('In tumblr');

	var client = tumblr.createClient(tumblr_oauth);
	client.taggedPosts(req.body.cityname, {limit:5}, function (err, data) {
		if(err) {
			console.log(err);
			res.status(500).send();
		} else {
			console.log(data);
			res.json(data);
		}
	});
});

app.post('/city-info-instas', function (req, res) {
	console.log('In insta');
	console.log(req.body.cityname);

	ig.media_popular(function(err, medias, remaining, limit) {
		if(err) {
			console.log(err);
		} else {
			console.log(medias);
		}
	});
});

app.post('/city-info-yelp', function (req, res) {
	console.log('In yelp');
	console.log(req.body.cityname);

	yelp.search({ term: 'food', limit: 2, location: req.body.cityname })
		.then(function (data) {
		 	console.log(data);
		 	res.json(data);
		})
		.catch(function (err) {
		 	console.error(err);
		 	res.status(500).send();
	});
});

app.listen(port, function() {
    console.log('App is running on http://localhost:' + port);
});
