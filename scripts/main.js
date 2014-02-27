require(["jquery", "goo"], function($, goo) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        //$('body').text(goo.goobers);
        goo.getCommitMessages("joshcough", "L5-Haskell");
    });
});
