app.controller('resultsYelpCtrl', ['$scope', '$http', 'myService', '$window', function($scope, $http, myService, $window) {
    console.log("hello from yelp");
    var yelpID = null;
    var cityName = myService.getCity();
    var data = {
        "Content-Type": "application/json",
        "userId": userId,
        "cityname": cityName
    }
     var interval = setInterval(function(){
      if (document.readyState == 'complete') {
        $window.scrollTo(0, -77);
        clearInterval(interval);
      }
    }, 200);

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
