$(document).ready(
    $(function () {

    $('#containerChart').highcharts({

        , {
            name: 'Disgust',
            borderColor: Highcharts.getOptions().colors[1],
            data: [{
                color: Highcharts.getOptions().colors[1],
                radius: '83%',
                innerRadius: '83%',
                y: 30
            }]
        }, {
            name: 'Fear',
            borderColor: Highcharts.getOptions().colors[2],
            data: [{
                color: Highcharts.getOptions().colors[2],
                radius: '72%',
                innerRadius: '72%',
                y: 80 
                }]
            }, {
            name: 'Joy',
            borderColor: Highcharts.getOptions().colors[3],
            data: [{
                color: Highcharts.getOptions().colors[3],
                radius: '61%',
                innerRadius: '61%',
                y: 65
            }]
        }, {
            name: 'Sadness',
            borderColor: Highcharts.getOptions().colors[4],
            data: [{
                color: Highcharts.getOptions().colors[4],
                radius: '50%',
                innerRadius: '50%',
                y: 50
            }]
        }]
        });
    })
);


