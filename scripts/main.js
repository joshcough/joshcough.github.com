require(["jquery", "github", "chart", "rss"], function($, github, chart, rss) {
    $(function() {
        chart.mkCommitChart("#L5HaskellCommits",     "joshcough", "L5-Haskell");
        chart.mkCommitChart("#HaskellStarterCommits", "joshcough", "HaskellStarter");
        rss.table("http://www.reddit.com/.rss", "Reddit", "#reddit-table");
        rss.table("http://feeds.theonion.com/theonion/daily", "The Onion", "#onion-table");
    });
});
