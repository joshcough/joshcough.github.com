require(["jquery", "rss"], function($, rss) {
    $(function() {
        rss.table(
          "http://www.reddit.com/r/haskell/.rss", 
          "Reddit :: Haskell", 
          "#reddit-haskell"
        );
        rss.table(
          "http://www.reddit.com/r/programming/.rss", 
          "Reddit :: Programming", 
          "#reddit-program"
        );
        rss.table(
          "http://feeds.theonion.com/theonion/daily", 
          "The Onion", 
          "#onion-table"
        );
    });
});
