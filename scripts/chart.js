define(["jquery", "highcharts", "github"], function($, highcharts, github){

  var mkCommitChart = function (theDiv, user, repo) {
    github.getCommitActivity(user, repo, function (res) {
      var commitsOverTime = $.map(res, function(r){ return r["days"]; });
      $(theDiv).highcharts({
        chart: { zoomType: 'x', spacingRight: 20 },
        title: { text: user + "/" + repo + " Commits Over Time" },
        subtitle: {
          text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' :
            'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime',
          maxZoom: 1 * 24 * 3600000, // 1 day
          title: { text: null }
        },
        yAxis:   { title: { text: 'Commits' }},
        tooltip: { shared: true },
        legend:  { enabled: false },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
            },
            lineWidth: 1,
            marker: { enabled: false },
            shadow: false,
            states: { hover: { lineWidth: 1 }},
            threshold: null
          }
        },
        series: [{
          type: 'area',
          name: 'Commits',
          pointInterval: 24 * 3600 * 1000,
          pointStart: res[0]["week"] * 1000, 
          data: commitsOverTime
        }]
      });
    });
  };

  return {
    mkCommitChart: mkCommitChart
  }
})
