// app.js
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            templateUrl: 'partial-about.html'
        })

        // RESULTS PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('results', {
            url: '/results',
            templateUrl: 'views/results.html'
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

routerApp.controller('homeCtrl', ['$scope', '$http', 'myService', '$window', function($scope, $http, myService, $window) {
    
    var refresh = function() {
        $scope.errorMsg = false;
        $scope.successMsg = false;
    };

    refresh();

    $scope.submitCityName = function() {
        if($scope.cityname) {
            $scope.errorMsg = false;
            $scope.successMsg = true;
            var data = {
                "Content-Type": "application/json",
                "cityname": $scope.cityname
            }
            $http.post('/city-info', data).success(function(res) {
                myService.set(res);
                myService.setCity($scope.cityname);
                var landingUrl = "http://" + $window.location.host + "/#/results";
                $window.location.href = landingUrl;
            });
        } else {
            $scope.successMsg = false;
            $scope.errorMsg = true;
        }
        
    };
}]);﻿

routerApp.controller('resultsTweetsCtrl', ['$scope', '$http', 'myService', function($scope, $http, myService) {
    $scope.positiveSentiMsg = false;
    $scope.negativeSentiMsg = false;
    
    tweetList = myService.get().tweets;
    tweetSentis = myService.get().sentiment;
    
    $scope.tweets = tweetList.statuses;
    $scope.sentiment = tweetSentis;
    
    if(tweetSentis.type === "positive")
        $scope.positiveSentiMsg = true;
    else
        $scope.negativeSentiMsg = true;
}]);﻿

routerApp.controller('resultsTubmlrCtrl', ['$scope', '$http', '$window', 'myService', function($scope, $http, $window, myService) {
    var cityName = myService.getCity();
    var data = {
        "Content-Type": "application/json",
        "cityname": cityName
    }
    $http.post('/city-info-tumblr', data).success(function(res) {
        $scope.tumblrs = res;
    });
    
}]);

routerApp.controller('resultsInstasCtrl', ['$scope', '$http', 'myService', function($scope, $http, myService) {
    console.log("hello from insta");

    var cityName = myService.getCity();
    var data = {
        "Content-Type": "application/json",
        "cityname": cityName
    }
    $http.post('/city-info-instas', data).success(function(res) {
        console.log(res);
    });
}]);﻿

routerApp.controller('resultsYelpCtrl', ['$scope', '$http', '$window', 'myService', function($scope, $http, $window, myService) {
    console.log("hello from yelp");

    var cityName = myService.getCity();
    var data = {
        "Content-Type": "application/json",
        "cityname": cityName
    }

    $http.post('/city-info-yelp', data).success(function(res) {
        $scope.yelps = res.businesses;
        console.log($scope.yelps);
    });
}]);﻿

routerApp.factory('myService', function() {
    var savedData = {}
    var savedCity = ""

    function set(data) {
        savedData = data;
    }

    function get() {
        return savedData;
    }

    function setCity(city) {
        savedCity = city;
    }

    function getCity() {
        return savedCity;
    }

    return {
        set: set,
        get: get,
        setCity: setCity,
        getCity: getCity
    }

});
