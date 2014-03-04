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
        //console.log(e);
        return { title: e["title"], url: e["link"] }; 
      }))
    });
  }

  var mkLink = function(text, href){
    return "<a href='" + href + "'>" + text + "</a>";
  }

  var feedToTable = function(url, id, title, cont){
    var mkTable = function(title, body){
      /*var it = 
       ["<table id='"+id+"-table"+"' class='rounded-corner'>",
        "  <thead>",
        "    <tr>",
        "      <th scope='col' class='rounded-left'></th>",
        "      <th scope='col'>"+title+"</th>",
        "      <th scope='col' class='rounded-right'></th>",
        "    </tr>",
        "  </thead>",
        "  <tbody>"+body+"</tbody>",
        "  <tfoot>",
        "    <td class='rounded-foot-left'/>",
        "    <td/>",
        "    <td class='rounded-foot-right'/>",
        "  </tfoot>",
        "</table>"
       ].join('\n');*/
      var it = 
       ["<table id='"+id+"-table"+"'>",
        "  <thead>",
        "    <tr>",
        "      <th></th>",
        "      <th>"+title+"</th>",
        "      <th></th>",
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
    feedToTable(url, id, title, function(table){ 
      $("#" + id).html(table); 
      $("#" + id + "-table").dataTable({"bJQueryUI": true});
    });
  } 

  return {
    parseRSS: parseRSS,
    table: rssTable
  }
})
