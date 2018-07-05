function chart(data) {
  var date = [], max=[], min=[];
  for (var i=0; i<data.length;i++) {
    date[i] = data[i].DATE;
    max[i] = JSON.parse(data[i].TMAX);
    min[i] = JSON.parse(data[i].TMIN);
  }
console.log(max);
console.log(min);
  var graph = Highcharts.chart('date', {
    chart: {
        renderTo: 'chart',
        type: 'line'
    },
    title: {
        text: 'Weather Plot'
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    xAxis: {
        categories: date,
    },
    yAxis: {
        title: {
            text: 'Temperature'
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: ' F'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [{
        name: 'TMAX',
        data: max
    }, {
        name: 'TMIN',
        data: min
    }]
});
}
