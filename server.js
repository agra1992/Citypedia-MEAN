var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var _ = require('underscore');
var db = require('./db');

//=========================================================================
//OPENWEATHERMAP
//=========================================================================
var weather = require('npm-openweathermap');
//set your API key if you have one 
weather.api_key = '2fdd4a04dafaf20bc3fe0a646f8165c1';
weather.temp = 'f';
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
var alchemy_config = require('./config/alchemy.config');
var alchemy = new AlchemyAPI(alchemy_config.alchemy.api_key);
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
//FLICKR
//=========================================================================
var Flickr = require("node-flickr");
var keys = {"api_key": "1b158f32afa3ea9246f4791ca798f838"}
var flickr = new Flickr(keys);

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
var PORT = process.env.PORT || 3000;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/'));

// set the home page route
app.get('/', function(req, res) {

    // make sure index is in the right directory. In this case /app/index.html
    res.render('index');
});

app.post('/city-info-twitter', function (req, res) {
	console.log('In tweets post');

	if(req.body) {
		var city = encodeURIComponent(req.body.cityname);

		twitterClient.get('search/tweets', {q: city, lang: "en"}, function(error, tweets, response) {
			if(error) {
				res.status(500).send();
			} else {
				alchemy.sentiment(JSON.stringify(tweets), {}, function(err, data) {
					console.log('here1');
					if (err) {
						console.log('Error in alchemy sentiments');
						res.status(500).send();
					}
					console.log('here2');
					// See http://www.alchemyapi.com/api/ for format of returned object
					var sentiments = data.docSentiment;
					alchemy.emotions(JSON.stringify(tweets), {}, function(err, response) {
						if (err) {
							console.log('Error in alchemy emotions');
							res.status(500).send();
						}
						// See http://www.alchemyapi.com/api/html-api-1 for format of returned object
						var emotions = response.docEmotions;

						var allData = {
							'tweets': tweets,
							'sentiments': sentiments,
							'emotions': emotions
						};
						db.dbschema.create({userId: req.body.userId + '_tweets', allTwitterData: JSON.stringify(allData)}).then(function(data) {
							//console.log(data);
							res.json(data);
						}, function(e) {
							console.log(e);
							res.status(400).json(e);
						});
					});
				});
			}
		});
	}
});

app.get('/city-info-twitter', function(req, res) {
	console.log('In tweets get');

	db.dbschema.findOne({
		where: {
			userId: req.query.userId + '_tweets'
		}
	}).then(function(data) {
		console.log('here3', data);
		if (!data) {
			console.log('here4');
			res.json({ data: null });
		} else {
			res.json({ "userId": data.userId, "allTwitterData": data.allTwitterData});
		}
	}, function(e) {
		res.status(404).send();
	});
});


app.get('/city-info-openweather', function(req, res) {
	console.log('In openweather get');

	db.dbschema.findOne({
		where: {
			userId: req.query.userId + '_weather'
		}
	}).then(function(data) {
		if (!data) {
			res.send({ data: null });
		} else {
			res.json({ "userId": data.userId, "weatherData": data.weatherData});
		}
	}, function(e) {
		res.status(404).send();
	});
});

app.post('/city-info-openweather', function (req, res) {
	console.log('In openweather post');

	weather.get_weather_custom('city', req.body.cityname, 'forecast').then(function(data){
	    db.dbschema.create({userId: req.body.userId + '_weather', weatherData: JSON.stringify(data)}).then(function(data) {
	    	res.json(data);
	    }, function(e) {
	    	console.log(e);
	    	res.status(400).json(e);
	    });
	}, function(err){
	    console.log(err);
	});
});

app.get('/city-info-tumblr', function(req, res) {
	console.log('In tumblr get');

	db.dbschema.findOne({
		where: {
			userId: req.query.userId + '_tumblr'
		}
	}).then(function(data) {
		if (!data) {
			res.send({ data: null });
		} else {
			res.json({ "userId": data.userId, "tumblrData": data.tumblrData});
		}
	}, function(e) {
		res.status(404).send();
	});
});

app.post('/city-info-tumblr', function (req, res) {
	console.log('In tumblr post');
	var arrTumblrData = [];
	var client = tumblr.createClient(tumblr_oauth);

	client.taggedPosts(req.body.cityname, {limit:15}, function (err, data) {
		if(err) {
			console.log(err);
			res.status(500).send();
		} else {
			data.forEach(function(item) {
				var val = {
					'blogName': item.blog_name,
					'postUrl': item.post_url
				}
				arrTumblrData.push(val);
			});
			db.dbschema.create({userId: req.body.userId + '_tumblr', tumblrData: JSON.stringify(arrTumblrData)}).then(function(data) {
				res.json(data);
			}, function(e) {
				console.log(e);
				res.status(400).json(e);
			});
		}
	});
});

app.get('/city-info-flickr', function(req, res) {
	console.log('In flickr get');

	db.dbschema.findOne({
		where: {
			userId: req.query.userId + '_flickr'
		}
	}).then(function(data) {
		if (!data) {
			res.send({ data: null });
			//res.json(data.toJSON());
		} else {
			res.json({ "userId": data.userId, "flickrData": data.flickrData});
		}
	}, function(e) {
		res.status(404).send();
	});
});

app.post('/city-info-flickr', function (req, res) {
	console.log('In flickr post');

	flickr.get("photos.search", { "tags": req.body.cityname, "per_page": 100 }, function(err, flickrRes){
	    if (err) {
	    	res.status(404).send();
	    }
	    else {
	    	console.log(flickrRes.photos);
	    	db.dbschema.create({userId: req.body.userId + '_flickr', flickrData: JSON.stringify(flickrRes.photos)}).then(function(data) {
		 		res.json(data);
		 	}, function(e) {
		 		console.log(e);
		 		res.status(400).json(e);
		 	});
	    }
	});
});


app.get('/city-info-yelp', function(req, res) {
	console.log('In yelp get');

	db.dbschema.findOne({
		where: {
			userId: req.query.userId + '_yelp'
		}
	}).then(function(data) {
		if (!data) {
			res.send({ data: null });
			//res.json(data.toJSON());
		} else {
			res.json({ "userId": data.userId, "yelpData": data.yelpData});
		}
	}, function(e) {
		res.status(404).send();
	});
});

app.post('/city-info-yelp', function (req, res) {
	console.log('In yelp post');

	yelp.search({ term: 'food', location: req.body.cityname })
		.then(function (data) {
		 	var arrYelpData = [];
		 	data.businesses.forEach(function(item) {
		 		var val = {
		 			'yelpImageUrl': item.image_url,
		 			'yelpName': item.name,
		 			'yelpRatingImgUrl': item.rating_img_url,
		 			'yelpUrl': item.url
		 		};
		 		arrYelpData.push(val);
		 	});
		 	//Insert data into DB
		 	db.dbschema.create({userId: req.body.userId + '_yelp', yelpData: JSON.stringify(arrYelpData)}).then(function(data) {
		 		res.json(data);
		 	}, function(e) {
		 		console.log(e);
		 		res.status(400).json(e);
		 	});
		})
		.catch(function (err) {
		 	console.error(err);
		 	res.status(500).send();
	});
});

db.sequelize.sync({force: true}).then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});