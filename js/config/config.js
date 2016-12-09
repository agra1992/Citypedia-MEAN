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

        .state('weather', {
            url: '/results/weather',
            templateUrl: 'views/weather.html'
        })

        .state('tweets', {
            url: '/results/tweets',
            templateUrl: 'views/tweets.html'
        })

        .state('tumblr', {
            url: '/results/tumblr',
            templateUrl: 'views/tumblr.html'
        })

        .state('instas', {
            url: '/results/instas',
            templateUrl: 'views/instas.html'
        })

        .state('yelp', {
            url: '/results/yelp',
            templateUrl: 'views/yelp.html'
        })
});
