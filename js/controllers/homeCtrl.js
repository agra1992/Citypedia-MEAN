app.controller('homeCtrl', ['$scope', '$http', 'myService', '$window', function($scope, $http, myService, $window) {
    
    var refresh = function() {
        $scope.errorMsg = false;
        $scope.successMsg = false;
    };

    refresh();

    var interval = setInterval(function(){
      if (document.readyState == 'complete') {
        $window.scrollTo(0, -77);
        clearInterval(interval);
      }
    }, 200);

    $scope.submitCityName = function() {
        if($scope.cityname) {
            $scope.errorMsg = false;
            $scope.successMsg = true;
            myService.setCity($scope.cityname);
            var landingUrl = "http://" + $window.location.host + "/#/results";
            $window.location.href = landingUrl;
        } else {
            $scope.successMsg = false;
            $scope.errorMsg = true;
        }
        
    };
    
}]);﻿

