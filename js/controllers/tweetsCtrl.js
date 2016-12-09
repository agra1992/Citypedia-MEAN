app.controller('resultsTweetsCtrl', ['$scope', '$http', 'myService', function($scope, $http, myService) {

    $scope.positiveSentiMsg = false;
    $scope.negativeSentiMsg = false;
    
    var cityName = myService.getCity();
    var data = {
        "Content-Type": "application/json",
        "userId": userId,
        "cityname": cityName
    }
    $http.get('/city-info-twitter', {params: { "userId" : userId }}).then(function (twitterRes) {
        if(! twitterRes.data.allTwitterData) { 
            $http.post('/city-info-twitter', data).success(function(twitterRes) {
                $scope.tweets = JSON.parse(twitterRes.allTwitterData).tweets.statuses;
                $scope.sentiment = JSON.parse(twitterRes.allTwitterData).sentiments;
                if($scope.sentiment === "positive")
                    $scope.positiveSentiMsg = true;
                else
                    $scope.negativeSentiMsg = true;
                var emotionsObj = JSON.parse(twitterRes.allTwitterData).emotions;
                var emotionsArr = [];
                for (var key in emotionsObj) {
                    emotionsArr.push({'emotion': key, 'value': emotionsObj[key]});
                }
                $scope.emotions = emotionsArr;
            });
        } else {
            $scope.tweets = JSON.parse(twitterRes.data.allTwitterData).tweets.statuses;
            $scope.sentiment = JSON.parse(twitterRes.data.allTwitterData).sentiments;
            if($scope.sentiment.type === "positive")
                $scope.positiveSentiMsg = true;
            else
                $scope.negativeSentiMsg = true;
            var emotionsObj = JSON.parse(twitterRes.data.allTwitterData).emotions;
            var emotionsArr = [];
            for (var key in emotionsObj) {
                emotionsArr.push({'emotion': key, 'value': emotionsObj[key]});
            }
            $scope.emotions = emotionsArr;
        }
    }, function (err) {
        console.log(err);
    });
}]);﻿

