app.controller('resultsWeatherCtrl', ['$scope', '$http', 'myService', '$window', function($scope, $http, myService, $window) {
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
