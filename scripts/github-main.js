require(["jquery", "github", "chart"], function($, github, chart) {
  $(function() {
    chart.mkCommitChart("#L5HaskellCommits",     "joshcough", "L5-Haskell");
    chart.mkCommitChart("#HaskellStarterCommits", "joshcough", "HaskellStarter");
  });
});
