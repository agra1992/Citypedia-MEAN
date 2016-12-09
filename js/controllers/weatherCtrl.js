app.controller('resultsWeatherCtrl', ['$scope', '$http', 'myService', function($scope, $http, myService) {
    var cityName = myService.getCity();
    var data = {
        "Content-Type": "application/json",
        "userId": userId,
        "cityname": cityName
    }

    $http.get('/city-info-openweather', {params: { "userId" : userId }}).then(function (weatherRes) {
        if(! weatherRes.data.weatherData) {
            $http.post('/city-info-openweather', data).success(function(weatherRes) {
                $scope.weathers = JSON.parse(weatherRes.weatherData);
            }).error(function(err) {
                console.log(err);
            });
        } else {
            $scope.weathers = JSON.parse(weatherRes.data.weatherData);
        }
    }, function (err) {
        console.log(err);
    });    
}]);
