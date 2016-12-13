app.controller('resultsFlickrCtrl', ['$scope', '$http', 'myService', '$window', function($scope, $http, myService, $window) {
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

    $http.get('/city-info-flickr', {params: { "userId" : userId }}).then(function (flickrRes) {
        if(! flickrRes.data.flickrData) {
        	console.log('inside');
            $http.post('/city-info-flickr', data).success(function(flickrRes) {
                 $scope.flickrs = JSON.parse(flickrRes.flickrData).photo;
            }).error(function(err) {
            	console.log(err);
            });
        } else {
        	console.log('outside');
            $scope.flickrs = JSON.parse(flickrRes.data.flickrData).photo;
        }
    }, function (err) {
        console.log(err);
    });    
}]);

