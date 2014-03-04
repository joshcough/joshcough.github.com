require(["jquery", "github", "chart", "rss"], function($, github, chart, rss) {
    $(function() {
        /*
        github.getCommitMessages("joshcough", "L5-Haskell", function (res) {
            $.each(res, function(i,el) {
                $("#result").append("<li>" + el["commit"]["message"] + "</li>");
            });
        });
        */
        chart.mkCommitChart("#L5HaskellCommits",     "joshcough", "L5-Haskell");
        chart.mkCommitChart("#HaskellStarterCommits", "joshcough", "HaskellStarter");

        rss.getTitlesAsTable("http://www.reddit.com/.rss", function(res){
          $("#reddit-table tbody").html(res);
        });

    });
});
