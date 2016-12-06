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
    	var url = "http://api.openweathermap.org/data/2.5/weather?appid=2fdd4a04dafaf20bc3fe0a646f8165c1&q=";
      console.log('controller', $scope.city);
      $scope.getTemp = function(city) {
        $http({
          method: 'JSONP',
          url: url + city
        }).success(function(data) {
          var weather = [];
          angular.forEach(data.weather, function(value){
            weather.push(value);
          });
          $scope.weather = weather;
        });
      }
    }],
    link: function($scope, element, attributes) {
      console.log('linker', $scope.city);
    	console.log(attributes.city);
    	console.log($scope.getTemp(attributes.city));
    	$scope.getTemp(attributes.city);
    	console.log($scope.weather);
    }
  };
});

angular
   .module('app')
   .controller('MyController', function(){
	console.log('Inside MyController');
});