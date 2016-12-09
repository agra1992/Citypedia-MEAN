app.controller('resultsInstasCtrl', ['$scope', '$http', 'myService', function($scope, $http, myService) {
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
