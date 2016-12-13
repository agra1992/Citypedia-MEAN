app.controller('resultsCtrl', ['$state', '$scope', '$window', function($state, $scope, $window) {
    
    $state.transitionTo('results.weather');

     var interval = setInterval(function(){
      if (document.readyState == 'complete') {
        $window.scrollTo(0, -77);
        clearInterval(interval);
      }
    }, 200);

    $scope.goHome = function() {
    	var landingUrl = "http://" + $window.location.host + "/#/home";
        $window.location.href = landingUrl;
    	$window.location.reload();
    }
    
}]);﻿