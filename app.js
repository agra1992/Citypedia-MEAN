// app.js
var routerApp = angular.module('routerApp', ['ui.router']);

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

        .state('fbstatuses', {
            url: '/results/fbstatuses',
            templateUrl: 'views/fbstatuses.html'
        })

        .state('instas', {
            url: '/results/instas',
            templateUrl: 'views/instas.html'
        })
});

routerApp.controller('homeCtrl', ['$scope', '$http', 'myService', '$window', function($scope, $http, myService, $window) {
    console.log("Hello World from home controller");
    
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

routerApp.controller('resultsCtrl', ['$scope', '$http', 'myService', '$window', function($scope, $http, myService, $window) {
    console.log("Hello World from home controller");
    

    $scope.getFBData = function() {
        if(myService.getCity()) {
            var data = {
                "Content-Type": "application/json",
                "cityname": $scope.cityname
            }
            $http.post('/city-info-fb', data).success(function(res) {
                myService.set(res);
                var landingUrl = "http://" + $window.location.host + "/#/results";
                $window.location.href = landingUrl;
            });
        } else {
            alert("Error");
        }
        
    };
}]);﻿

routerApp.controller('resultsTweetsCtrl', ['$scope', '$http', 'myService', function($scope, $http, myService) {
    console.log("Hello World from results tweets controller");
    tweetList = myService.get();
    $scope.tweets = tweetList.statuses;

}]);﻿

routerApp.factory('myService', function() {
    var savedData = {}
    var savedCity = ""

    function set(data) {
        console.log(data);
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
