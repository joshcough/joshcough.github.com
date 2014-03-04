require(["jquery", "rss"], function($, rss) {
    $(function() {
        rss.table("http://www.reddit.com/.rss", "Reddit", "#reddit-table");
        rss.table("http://feeds.theonion.com/theonion/daily", "The Onion", "#onion-table");
    });
});
