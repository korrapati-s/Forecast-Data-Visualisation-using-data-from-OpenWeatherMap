function owm() {
  $.getJSON("http://api.openweathermap.org/data/2.5/forecast?id=4508722&APPID=ac62b1a01be6656cb66ba210e6f93f6e",function(data){
    var date = [], max=[], min=[];
    for (var i=0; i<data.list.length;i++) {
      date[i] = (data.list[i].dt)*1000 ;
      max[i] = data.list[i].main.temp_max;
      min[i] = data.list[i].main.temp_min;
    }

    var graph = Highcharts.chart('date', {
      chart: {
          renderTo: 'chart',
          type: 'line'
      },
      title: {
          text: 'Weather Plot'
      },
      subtitle: {
        text: 'Hover over the chart to get the information'
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
          type: 'datetime',
          categories: date,
          tickInterval: 300
      },
      yAxis: {
          title: {
              text: 'Temperature'
          }
      },
      tooltip: {
          shared: true,
          valueSuffix: ' K'
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
  });

}
