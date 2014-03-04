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

  var feedToTable = function(url, title, cont){
    var mkTable = function(title, body){
      var it = 
       ["<table class='rounded-corner'>",
        "  <thead>",
        "    <tr>",
        "      <th scope='col' class='rounded-left'></th>",
        "      <th scope='col'>"+title+"</th>",
        "      <th scope='col' class='rounded-right'></th>",
        "    </tr>",
        "  </thead>",
        "  <tbody>"+body+"</tbody>",
        "</table>"
       ].join('\n');
      return it;
    }
    getTitlesAndUrls(url, function(tus){
      var tbl_body = "";
      $.each(tus, function(i, tu) {
        tbl_body += "<tr><td/><td>"+mkLink(tu["title"], tu["url"])+"</td><td/></tr>";                 
      });
      cont(mkTable(title, tbl_body));
    });
  }

  var rssTable = function(url, title, id){
    feedToTable(url, title, function(table){ $(id).html(table); });
  } 

  return {
    parseRSS: parseRSS,
    table: rssTable
  }
})
