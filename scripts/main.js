require(["jquery", "github", "chart", "rss"], function($, github, chart, rss) {
    $(function() {
        chart.mkCommitChart("#L5HaskellCommits",     "joshcough", "L5-Haskell");
        chart.mkCommitChart("#HaskellStarterCommits", "joshcough", "HaskellStarter");

        rss.feedToTable("http://www.reddit.com/.rss", "Reddit", function(table){
          $("#reddit-table").html(table);
        });
        rss.feedToTable("http://feeds.theonion.com/theonion/daily", "The Onion", function(table){
          $("#onion-table").html(table);
        });
    });
});

/*
github.getCommitMessages("joshcough", "L5-Haskell", function (res) {
    $.each(res, function(i,el) {
        $("#result").append("<li>" + el["commit"]["message"] + "</li>");
    });
});
*/
