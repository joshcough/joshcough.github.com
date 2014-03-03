define(["jquery"], function($){

  function repoUrl(user, repo){
    return "https://api.github.com/repos/"+user+"/"+repo+"/";
  };

  function getGitHubData(user, repo, action, cont){
    $.ajax({
      url: repoUrl(user, repo) + action,
      dataType: "json",
      success: cont
    });
  };

  var getCommitMessages = function(user, repo, cont){
    getGitHubData(user, repo, "commits", cont);
  };

  var getCommitActivity = function(user, repo, cont){
    getGitHubData(user, repo, "stats/commit_activity", function(data){
      while(data[0]["total"] === 0){ data.shift(); }
      cont(data);
    });
  };

  return {
    getCommitMessages: getCommitMessages,
    getCommitActivity: getCommitActivity
  }
})
