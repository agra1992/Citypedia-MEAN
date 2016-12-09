app.controller('resultsYelpCtrl', ['$scope', '$http', 'myService', function($scope, $http, myService) {
    console.log("hello from yelp");
    var yelpID = null;
    var cityName = myService.getCity();
    var data = {
        "Content-Type": "application/json",
        "userId": userId,
        "cityname": cityName
    }

    $http.get('/city-info-yelp', {params: { "userId" : userId }}).then(function (yelpRes) {
        if(! yelpRes.data.yelpData) {
            $http.post('/city-info-yelp', data).success(function(yelpRes) {
                $scope.yelps = JSON.parse(yelpRes.yelpData);
            }).error(function(err) {
                console.log(err);
            });
        } else {
            $scope.yelps = JSON.parse(yelpRes.data.yelpData);
        }
    }, function (err) {
        console.log(err);
    });
}]);﻿
