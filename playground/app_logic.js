angular
   .module('app')
   .directive('ngSparkline', function() {
  return {
    restrict: 'A',
    scope: {
      city: '@'
    },
    transclude: true,
	template: '<div class="sparkline"><div ng-transclude></div></div>',
    controller: ['$scope', '$http', function($scope, $http) {
    	var url = "http://api.openweathermap.org/data/2.5/weather?appid=2fdd4a04dafaf20bc3fe0a646f8165c1&q=" + $scope.city;
      
      $scope.getTemp = function(city) {
        $http.get(url).success(function(data) {
          var weather = [];
          angular.forEach(data.weather, function(value){
            weather.push(value);
          });
          $scope.weather = weather;
        });
      }
    }],
    link: function($scope, element, attributes) {
    	$scope.getTemp(attributes.city);
      $scope.$watch("weather", function(newVal) {
        console.log($scope.weather);
      });
    }
  };
});

angular
   .module('app')
   .controller('MyController', function(){
	console.log('Inside MyController');
});