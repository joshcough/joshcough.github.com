require(["jquery", "github", "chart"], function($, github, chart) {
    $(function() {
        /*
        github.getCommitMessages("joshcough", "L5-Haskell", function (res) {
            $.each(res, function(i,el) {
                $("#result").append("<li>" + el["commit"]["message"] + "</li>");
            });
        });
        */
        github.getCommitActivity("joshcough", "L5-Haskell", function (res) {
          chart.mkChart('#stats', $.map(res, function(r){ return r["days"]; }));
        });
    });
});
