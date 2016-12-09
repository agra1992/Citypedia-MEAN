app.controller('resultsTubmlrCtrl', ['$scope', '$http', 'myService', function($scope, $http, myService) {
    var cityName = myService.getCity();
    var data = {
        "Content-Type": "application/json",
        "userId": userId,
        "cityname": cityName
    }

    $http.get('/city-info-tumblr', {params: { "userId" : userId }}).then(function (tumblrRes) {
        if(! tumblrRes.data.tumblrData) {
            $http.post('/city-info-tumblr', data).success(function(tumblrRes) {
                 $scope.tumblrs = JSON.parse(tumblrRes.tumblrData);
            });
        } else {
            $scope.tumblrs = JSON.parse(tumblrRes.data.tumblrData);
        }
    }, function (err) {
        console.log(err);
    });    
}]);

