app.controller('resultsTweetsCtrl', ['$scope', '$http', 'myService', '$window', function($scope, $http, myService, $window) {

    $scope.positiveSentiMsg = false;
    $scope.negativeSentiMsg = false;
    
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
                Highcharts.chart('containerChart', {
                  
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Emotion Analysis'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'Emotions',
                        colorByPoint: true,
                        data: [{
                            name: $scope.emotions[0].emotion ,
                            y: $scope.emotions[0].value * 100
                        }, {
                            name: $scope.emotions[1].emotion,
                            y: $scope.emotions[1].value * 100,
                            sliced: true,
                            selected: true
                        }, {
                            name: $scope.emotions[2].emotion,
                            y: $scope.emotions[2].value * 100
                        }, {
                            name: $scope.emotions[3].emotion,
                            y: $scope.emotions[3].value * 100
                        }, {
                            name: $scope.emotions[4].emotion,
                            y: $scope.emotions[4].value * 100
                        }]
                    }]
                        
                });

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
            Highcharts.chart('containerChart', {
              
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Emotion Analysis'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Emotions',
                    colorByPoint: true,
                    data: [{
                        name: $scope.emotions[0].emotion ,
                        y: $scope.emotions[0].value * 100
                    }, {
                        name: $scope.emotions[1].emotion,
                        y: $scope.emotions[1].value * 100,
                        sliced: true,
                        selected: true
                    }, {
                        name: $scope.emotions[2].emotion,
                        y: $scope.emotions[2].value * 100
                    }, {
                        name: $scope.emotions[3].emotion,
                        y: $scope.emotions[3].value * 100
                    }, {
                        name: $scope.emotions[4].emotion,
                        y: $scope.emotions[4].value * 100
                    }]
                }]
                    
            });
        }
    }, function (err) {
        console.log(err);
    });
}]);﻿

