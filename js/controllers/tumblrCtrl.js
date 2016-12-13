app.controller('resultsTubmlrCtrl', ['$scope', '$http', 'myService', '$window', function($scope, $http, myService, $window) {
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

