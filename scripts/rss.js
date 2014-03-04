define(["jquery"], function($){

  var converterUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q='

  var parseRSS = function(url, cont) {
    $.ajax({
      url: converterUrl + encodeURIComponent(url),
      dataType: 'json',
      success: function(data) { cont(data.responseData.feed); }
    });
  }

  var getTitlesAndUrls = function(url, cont) {
    parseRSS(url, function(data){
      cont($.map(data["entries"], function(e){
        //console.log(e);
        return { title: e["title"], url: e["link"] }; 
      }))
    });
  }

  var mkLink = function(text, href){
    return "<a href='" + href + "'>" + text + "</a>";
  }

  var getTitlesAsTable = function(url, cont){
    getTitlesAndUrls(url, function(tus){
      var tbl_body = "";
      $.each(tus, function(i, tu) {
        tbl_body += "<tr><td/><td>"+mkLink(tu["title"], tu["url"])+"</td><td/></tr>";                 
      });
      cont(tbl_body);
    });
  }

  return {
    parseRSS: parseRSS,
    getTitlesAndUrls: getTitlesAndUrls,
    getTitlesAsTable: getTitlesAsTable
  }
})
