define(["jquery", "datatables"], function($, datatables){

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
        return { title: e["title"], url: e["link"] }; 
      }))
    });
  }

  var mkLink = function(text, href){
    return "<a href='" + href + "'>" + text + "</a>";
  }

  var feedToTable = function(url, id, title, cont){
    getTitlesAndUrls(url, function(tus){
      var tbl_body = "";
      $.each(tus, function(i, tu) {
        tbl_body += "<tr><td>"+mkLink(tu["title"], tu["url"])+"</td></tr>";                 
      });
      var table =  
       ["<table id='"+id+"-table"+"'>",
        "  <thead><tr><th class='rssheader'>"+title+"</th></tr></thead>",
        "  <tbody>"+tbl_body+"</tbody>",
        "</table>"
       ].join('\n');
      cont(table);
    });
  }

  var rssTable = function(url, title, id){
    feedToTable(url, id, title, function(table){ 
      $("#" + id).html(table); 
      $("#" + id + "-table").dataTable({
        bPaginate: false,
        bSort: false,
        bFilter: false,
        bInfo: false,
        "sScrollY": "200px",
      });
    });
  } 

  return {
    parseRSS: parseRSS,
    table: rssTable
  }
})
