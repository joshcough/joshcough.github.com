define(["jquery"], function($){

  var getCommitMessages = function(user, repo){
    $.ajax({
      url: "https://api.github.com/repos/"+user+"/"+repo+"/commits",
      dataType: "json",
      success: function (res) {
        $.each( res, function(i,el) {
          $("#result").append("<li>" + el["commit"]["message"] + "</li>");
        });
      }  
    });
  };

  return {
    getCommitMessages: getCommitMessages
  }
})
