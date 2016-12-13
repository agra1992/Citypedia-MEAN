app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html'
        })

        // RESULTS PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('results', {
            url: '/results',
            templateUrl: 'views/results.html'
        })

        .state('results.weather', {
            url: '/weather',
            templateUrl: 'views/weather.html'
        })

        .state('results.tweets', {
            url: '/tweets',
            templateUrl: 'views/tweets.html'
        })

        .state('results.tumblr', {
            url: '/tumblr',
            templateUrl: 'views/tumblr.html'
        })

        .state('results.flickr', {
            url: '/flickr',
            templateUrl: 'views/flickr.html'
        })

        .state('results.yelp', {
            url: '/yelp',
            templateUrl: 'views/yelp.html'
        })
});
